import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import { useExchangeRate } from '../../hooks/useExchangeRate';
import { CryptoMarket } from '../../types/crypto';
import { ActionSheetRef } from 'react-native-actions-sheet';
import SelectCryptoSheet from '../../components/exchange/SelectCryptoSheet';
import SelectFiatSheet from '../../components/exchange/SelectFiatSheet';
import { getCurrencyName, getFlag } from '../../utils/fiat';
import { ExchangeBox } from '../../components/ExchangeBox';
import { useFocusEffect } from '@react-navigation/native';

type Direction = 'cryptoToFiat' | 'fiatToCrypto';

export const ExchangeScreen = () => {
  const cryptoSheetRef = useRef<ActionSheetRef>(null);
  const fiatSheetRef = useRef<ActionSheetRef>(null);

  const [direction, setDirection] = useState<Direction>('cryptoToFiat');

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

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const convert = (input: string, dir: Direction = direction) => {
    const numeric = parseFloat(input.replace(',', '.') || '0');
    if (!isNaN(numeric) && rate) {
      if (dir === 'cryptoToFiat') {
        return (numeric * rate).toFixed(2);
      } else {
        if (rate === 0) return '0';
        return (numeric / rate).toFixed(8);
      }
    }
    return '0';
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setFromValue('');
        setToValue('0');
      };
    }, []),
  );

  const handleChange = (value: string) => {
    setFromValue(value);
    setToValue(convert(value));
  };

  useEffect(() => {
    setToValue(convert(fromValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate, selectedCoin, selectedFiatCode, direction]);

  const swap = () => {
    const newDirection: Direction =
      direction === 'cryptoToFiat' ? 'fiatToCrypto' : 'cryptoToFiat';
    setDirection(newDirection);
    setFromValue('');
    setToValue('');
  };

  const topBox =
    direction === 'cryptoToFiat'
      ? {
          icon: selectedCoin.image,
          symbol: fromSymbol,
          isFiat: false,
          onPress: () => cryptoSheetRef.current?.show(),
          placeholder: '0.00',
        }
      : {
          icon: selectedFiat.flag,
          symbol: selectedFiat.code.toUpperCase(),
          isFiat: true,
          onPress: () => fiatSheetRef.current?.show(),
          placeholder: '0.00',
        };

  const bottomBox =
    direction === 'cryptoToFiat'
      ? {
          icon: selectedFiat.flag,
          symbol: selectedFiat.code.toUpperCase(),
          isFiat: true,
          onPress: () => fiatSheetRef.current?.show(),
          placeholder: '0.00',
        }
      : {
          icon: selectedCoin.image,
          symbol: fromSymbol,
          isFiat: false,
          onPress: () => cryptoSheetRef.current?.show(),
          placeholder: '0.00',
        };

  return (
    <ScreenWrapper title="Exchange">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <ExchangeBox
            icon={topBox.icon}
            symbol={topBox.symbol}
            value={fromValue}
            placeholder={topBox.placeholder}
            onChange={handleChange}
            onPress={topBox.onPress}
            isFiat={topBox.isFiat}
          />

          <Pressable onPress={swap} style={styles.swapButton} hitSlop={10}>
            <Text style={styles.swapText}>⇅</Text>
          </Pressable>

          <ExchangeBox
            icon={bottomBox.icon}
            symbol={bottomBox.symbol}
            value={toValue}
            placeholder={bottomBox.placeholder}
            editable={false}
            isFiat={bottomBox.isFiat}
            onPress={bottomBox.onPress}
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
  swapButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  swapText: {
    fontSize: 18,
    fontWeight: '600',
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
