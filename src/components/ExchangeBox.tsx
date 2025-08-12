import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { Icon, TextInput } from 'react-native-paper';
import {
  sanitize,
  formatBTCEditable,
  formatReadOnly,
  formatReadOnlyCrypto,
} from '../utils/format';
import { useFocusEffect } from '@react-navigation/native';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editable, isFiat]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        handleBlur();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const handleChange = (t: string) => {
    const sanitized = sanitize(t);
    const nextDisplay = formatBTCEditable(sanitized, maxDecimalsEditable);
    setDisplay(nextDisplay);
    onChange?.(sanitized);
  };

  const code = (symbol ?? '').toUpperCase();
  const isUrl = !!icon && /^https?:\/\//.test(icon);

  return (
    <View style={styles.row}>
      <Pressable onPress={onPress} style={styles.currencyLabel} hitSlop={8}>
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
        <Icon source="chevron-down" size={16} color="#666" />
      </Pressable>

      <Animated.View style={[styles.inputWrapper, { transform: [{ scale }] }]}>
        <TextInput
          value={display}
          onChangeText={handleChange}
          onFocus={handleFocus}
          editable={editable}
          mode="flat"
          keyboardType="decimal-pad"
          placeholder={
            placeholder ??
            (editable ? (isFiat ? '0,00' : '0,0') : isFiat ? '0,00' : '0,0')
          }
          style={styles.input}
          underlineColor="transparent"
          selectionColor="#00000055"
          textColor="#151515"
          placeholderTextColor="#00000033"
          activeUnderlineColor="transparent"
          theme={{ colors: { primary: 'transparent', onSurface: '#151515' } }}
          autoFocus
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currencyLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 72,
  },
  emoji: {
    fontSize: 18,
  },
  iconImg: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  acronym: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    letterSpacing: 0.25,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 28,
    lineHeight: 34,
    paddingVertical: 6,
    paddingHorizontal: 0,
    textAlign: 'right',
  },
});

export default ExchangeBox;
