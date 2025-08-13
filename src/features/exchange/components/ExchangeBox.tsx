/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { View, Text, Pressable, Image, Animated, Easing } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';
import {
  sanitize,
  formatBTCEditable,
  formatReadOnly,
  formatReadOnlyCrypto,
} from '../../../utils/format';
import { useFocusEffect } from '@react-navigation/native';
import color from '../../../ui/token/colors';
import { styles } from './ExchangeBox.styles';
import { te } from '../i18n/te';

type Props = {
  icon?: string;
  symbol: string;
  value: string;
  editable?: boolean;
  isFiat?: boolean;
  onPress: () => void;
  onChange?: (raw: string) => void;
  placeholder?: string;
};

export const ExchangeBox: React.FC<Props> = ({
  icon,
  symbol,
  value,
  editable = true,
  isFiat = false,
  onPress,
  onChange,
  placeholder,
}) => {
  const [display, setDisplay] = React.useState('');
  const SCALE_FOCUSED = 1.18;
  const scale = React.useRef(new Animated.Value(1)).current;
  const handleBlur = () => animateTo(1);
  const animateTo = (to: number) => {
    Animated.timing(scale, {
      toValue: to,
      duration: 160,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };
  const handleFocus = () => animateTo(SCALE_FOCUSED);

  const maxDecimalsEditable = isFiat ? 2 : 8;
  const decimalsReadonly = isFiat ? 2 : 8;

  React.useEffect(() => {
    if (editable) {
      setDisplay(formatBTCEditable(value, maxDecimalsEditable));
    } else {
      setDisplay(
        isFiat
          ? formatReadOnly(value, decimalsReadonly)
          : formatReadOnlyCrypto(value, decimalsReadonly),
      );
    }
  }, [value, editable, isFiat]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        handleBlur();
      };
    }, []),
  );

  const handleChange = (tText: string) => {
    const sanitized = sanitize(tText);
    const nextDisplay = formatBTCEditable(sanitized, maxDecimalsEditable);
    setDisplay(nextDisplay);
    onChange?.(sanitized);
  };

  const code = (symbol ?? '').toUpperCase();
  const isUrl = !!icon && /^https?:\/\//.test(icon);
  const placeholderKey = isFiat ? 'placeholderFiat' : 'placeholderCrypto';
  const placeholderText = placeholder ?? te(placeholderKey);

  return (
    <View style={styles.row}>
      <Pressable onPress={onPress} style={styles.currencyLabel} hitSlop={18}>
        {icon ? (
          isUrl ? (
            <Image source={{ uri: icon }} style={styles.iconImg} />
          ) : (
            <Text style={styles.emoji}>{icon}</Text>
          )
        ) : (
          <Text style={styles.emoji}>🏳️</Text>
        )}
        <Text style={styles.acronym}>{code}</Text>
        <Icon source="chevron-down" size={16} color={color.blueGray700} />
      </Pressable>

      <Animated.View style={[styles.inputWrapper, { transform: [{ scale }] }]}>
        <TextInput
          value={display}
          onChangeText={handleChange}
          onFocus={handleFocus}
          editable={editable}
          mode="flat"
          keyboardType="decimal-pad"
          placeholder={placeholderText}
          style={styles.input}
          underlineColor="transparent"
          selectionColor={color.transparent6}
          textColor={color.black}
          placeholderTextColor={color.blueGray300}
          activeUnderlineColor="transparent"
          theme={{ colors: { primary: 'transparent', onSurface: color.black } }}
          autoFocus
        />
      </Animated.View>
    </View>
  );
};

export default ExchangeBox;
