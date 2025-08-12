import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import { useExchangeRate } from '../../hooks/useExchangeRate';
import { CryptoMarket } from '../../types/crypto';
import { ActionSheetRef } from 'react-native-actions-sheet';
import SelectCryptoSheet from '../../components/exchange/SelectCryptoSheet';
import SelectFiatSheet from '../../components/exchange/SelectFiatSheet';
import { getCurrencyName, getFlag } from '../../utils/fiat';
import { ExchangeBox } from '../../components/ExchangeBox';

export const ExchangeScreen = () => {
  const cryptoSheetRef = useRef<ActionSheetRef>(null);
  const fiatSheetRef = useRef<ActionSheetRef>(null);

  const [selectedCoin, setSelectedCoin] = useState<CryptoMarket>({
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 0,
    price_change_percentage_24h: 0,
  } as CryptoMarket);

  const [selectedFiatCode, setSelectedFiatCode] = useState('ars');

  const selectedFiat = {
    code: selectedFiatCode,
    name: getCurrencyName(selectedFiatCode),
    flag: getFlag(selectedFiatCode),
  };

  const fromSymbol = selectedCoin.symbol.toUpperCase();

  const { data: rate } = useExchangeRate(selectedCoin.id, selectedFiat.code);

  const [fromValue, setFromValue] = useState('0');
  const [toValue, setToValue] = useState('0');

  const convert = (input: string) => {
    const numeric = parseFloat(input.replace(',', '.') || '0');
    if (!isNaN(numeric) && rate) {
      return (numeric * rate).toFixed(2);
    }
    return '0';
  };

  const handleChange = (value: string) => {
    setFromValue(value);
    setToValue(convert(value));
  };

  useEffect(() => {
    setToValue(convert(fromValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate, selectedCoin, selectedFiatCode]);

  return (
    <ScreenWrapper title="Exchange">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <ExchangeBox
            icon={selectedCoin.image}
            symbol={fromSymbol}
            value={fromValue}
            onChange={handleChange}
            onPress={() => cryptoSheetRef.current?.show()}
          />

          <ExchangeBox
            icon={selectedFiat.flag}
            symbol={selectedFiat.code.toUpperCase()}
            value={toValue}
            editable={false}
            isFiat
            onPress={() => fiatSheetRef.current?.show()}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <SelectCryptoSheet
        ref={cryptoSheetRef}
        sheetId="select-crypto"
        onSelect={coin => {
          setSelectedCoin(coin);
          cryptoSheetRef.current?.hide();
        }}
      />

      <SelectFiatSheet
        ref={fiatSheetRef}
        sheetId="select-fiat"
        onSelect={fiat => {
          setSelectedFiatCode(fiat.code);
          fiatSheetRef.current?.hide();
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  label: { fontSize: 14, color: '#999' },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: { fontWeight: 'bold', fontSize: 16, color: '#fff' },
  buttonDisabled: { backgroundColor: '#aaa' },
  buttonEnabled: { backgroundColor: '#000' },
});

export default ExchangeScreen;
