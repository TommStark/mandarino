// src/components/ExchangeBox.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useExchangeRateQuery } from '../hooks/useExchangeRateQuery';
import { formatARS } from '../utils/format';

type Props = { onError?: (msg: string) => void };

const groupThousands = (intStr: string) =>
  intStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const ExchangeBox: React.FC<Props> = ({ onError }) => {
  const {
    data: rate,
    isFetching,
    isError,
    error,
  } = useExchangeRateQuery('bitcoin', 'ars');

  const [btcRaw, setBtcRaw] = React.useState('');
  const [btcText, setBtcText] = React.useState('');
  const [arsText, setArsText] = React.useState('');

  React.useEffect(() => {
    if (isError && onError)
      onError((error as any)?.message ?? 'Error cargando precio');
  }, [isError, error, onError]);

  const recalcARS = React.useCallback(
    (raw: string) => {
      if (
        rate &&
        raw !== '' &&
        !raw.endsWith(',') &&
        !Number.isNaN(Number(raw.replace(',', '.')))
      ) {
        setArsText(formatARS(Number(raw.replace(',', '.')) * rate));
      } else if (raw === '') {
        setArsText('');
      }
    },
    [rate],
  );

  const normalizeBtcInput = (src: string) => {
    const endsWithComma = src.endsWith(',');
    let only = src.replace(/[^0-9,]/g, '');

    const commaIndex = only.indexOf(',');
    let intPart = '';
    let decPart = '';

    if (commaIndex >= 0) {
      intPart = only.slice(0, commaIndex);
      decPart = only.slice(commaIndex + 1).replace(/,/g, '');
    } else {
      intPart = only;
    }

    if (decPart.length > 8) decPart = decPart.slice(0, 8);
    intPart = intPart.replace(/^0+(?=\d)/, '') || '0';

    const raw = commaIndex >= 0 ? `${intPart},${decPart}` : intPart;
    const displayInt = Number(intPart) >= 1 ? groupThousands(intPart) : intPart;

    let display = displayInt;
    if (commaIndex >= 0) {
      display += `,${decPart}`;
      if (endsWithComma && decPart === '') {
        display = `${displayInt},`;
      }
    }
    return { raw, display };
  };

  const onChangeBTC = (text: string) => {
    const { raw, display } = normalizeBtcInput(text);
    setBtcRaw(raw);
    setBtcText(display);
    recalcARS(raw);
  };

  React.useEffect(() => {
    recalcARS(btcRaw);
  }, [rate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.wrapper}>
      {/* BTC */}
      <View style={styles.row}>
        <View style={styles.currencyLabel}>
          <Text style={styles.emoji}>🟠</Text>
          <Text style={styles.acronym}>BTC</Text>
        </View>
        <TextInput
          value={btcText}
          onChangeText={onChangeBTC}
          mode="flat"
          keyboardType="decimal-pad"
          placeholder="0,0"
          style={styles.input}
          underlineColor="transparent"
          selectionColor="#00000055"
          textColor="#151515"
          placeholderTextColor="#00000033"
          autoCapitalize="none"
          autoCorrect={false}
          right={
            isFetching ? (
              <TextInput.Icon icon={() => <ActivityIndicator />} />
            ) : undefined
          }
        />
      </View>

      {/* ARS */}
      <View style={styles.row}>
        <View style={styles.currencyLabel}>
          <Text style={styles.emoji}>🇦🇷</Text>
          <Text style={styles.acronym}>ARS</Text>
        </View>
        <TextInput
          value={arsText}
          editable={false}
          mode="flat"
          placeholder="0,00"
          style={[styles.input, styles.readonly]}
          underlineColor="transparent"
          textColor="#151515"
          placeholderTextColor="#00000033"
        />
      </View>

      <Text style={styles.rateHint}>
        {rate
          ? `1 BTC ≈ ${formatARS(rate)} ARS`
          : isFetching
          ? 'Actualizando precio…'
          : 'Sin precio'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 12, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  currencyLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 72,
  },
  emoji: { fontSize: 18 },
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
  },
  readonly: { opacity: 0.9 },
  rateHint: { marginTop: 2, fontSize: 12, color: '#00000066', paddingLeft: 12 },
});

export default ExchangeBox;
