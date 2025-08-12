import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';
import {
  sanitize,
  formatBTCEditable,
  formatReadOnly,
  formatReadOnlyCrypto,
} from '../utils/format';

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

      <TextInput
        value={display}
        onChangeText={handleChange}
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
      />
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
