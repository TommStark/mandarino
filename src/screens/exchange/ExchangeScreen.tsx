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

const INITIAL_DIRECTION: Direction = 'cryptoToFiat';
const INITIAL_COIN: CryptoMarket = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  current_price: 0,
  price_change_percentage_24h: 0,
} as CryptoMarket;
const INITIAL_FIAT = 'ars';

function buildBoxes(
  direction: Direction,
  coin: CryptoMarket,
  fiat: { code: string; name: string; flag: string },
  refs: {
    crypto: React.RefObject<ActionSheetRef>;
    fiat: React.RefObject<ActionSheetRef>;
  },
) {
  const fromSymbol = coin.symbol.toUpperCase();

  if (direction === 'cryptoToFiat') {
    return {
      top: {
        icon: coin.image,
        symbol: fromSymbol,
        isFiat: false,
        onPress: () => refs.crypto.current?.show(),
        placeholder: '0.00',
      },
      bottom: {
        icon: fiat.flag,
        symbol: fiat.code.toUpperCase(),
        isFiat: true,
        onPress: () => refs.fiat.current?.show(),
        placeholder: '0.00',
      },
    };
  }
  return {
    top: {
      icon: fiat.flag,
      symbol: fiat.code.toUpperCase(),
      isFiat: true,
      onPress: () => refs.fiat.current?.show(),
      placeholder: '0.00',
    },
    bottom: {
      icon: coin.image,
      symbol: fromSymbol,
      isFiat: false,
      onPress: () => refs.crypto.current?.show(),
      placeholder: '0.00',
    },
  };
}

export const ExchangeScreen = () => {
  const cryptoSheetRef = useRef<ActionSheetRef>(
    null,
  ) as React.RefObject<ActionSheetRef>;
  const fiatSheetRef = useRef<ActionSheetRef>(
    null,
  ) as React.RefObject<ActionSheetRef>;

  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [selectedCoin, setSelectedCoin] = useState<CryptoMarket>(INITIAL_COIN);
  const [selectedFiatCode, setSelectedFiatCode] = useState(INITIAL_FIAT);

  const selectedFiat = {
    code: selectedFiatCode,
    name: getCurrencyName(selectedFiatCode),
    flag: getFlag(selectedFiatCode),
  };

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

  const resetAll = useCallback(() => {
    setDirection(INITIAL_DIRECTION);
    setSelectedCoin(INITIAL_COIN);
    setSelectedFiatCode(INITIAL_FIAT);
    setFromValue('');
    setToValue('');
    cryptoSheetRef.current?.hide?.();
    fiatSheetRef.current?.hide?.();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetAll();
      };
    }, [resetAll]),
  );

  const { top, bottom } = buildBoxes(direction, selectedCoin, selectedFiat, {
    crypto: cryptoSheetRef,
    fiat: fiatSheetRef,
  });

  const formatCryptoHint = (n: number, max = 8) => {
    const s = n.toFixed(max).replace(/0+$/, '').replace(/\.$/, '');
    return s.replace('.', ',');
  };
  const unitHint = React.useMemo(() => {
    if (!rate || rate === 0) return 'Sin precio';
    if (direction === 'cryptoToFiat') {
      return `1 ${selectedCoin.symbol.toUpperCase()} ≈ ${rate} ${selectedFiat.code.toUpperCase()}`;
    }
    const inv = 1 / rate;
    return `1 ${selectedFiat.code.toUpperCase()} ≈ ${formatCryptoHint(
      inv,
    )} ${selectedCoin.symbol.toUpperCase()}`;
  }, [rate, direction, selectedCoin.symbol, selectedFiat.code]);

  return (
    <ScreenWrapper title="Exchange">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <ExchangeBox
            icon={top.icon}
            symbol={top.symbol}
            value={fromValue}
            placeholder={top.placeholder}
            onChange={handleChange}
            onPress={top.onPress}
            isFiat={top.isFiat}
          />

          <Pressable onPress={swap} style={styles.swapButton} hitSlop={10}>
            <Text style={styles.swapText}>⇅</Text>
          </Pressable>

          <ExchangeBox
            icon={bottom.icon}
            symbol={bottom.symbol}
            value={toValue}
            placeholder={bottom.placeholder}
            editable={false}
            isFiat={bottom.isFiat}
            onPress={bottom.onPress}
          />
          <Text style={styles.hint}>{unitHint}</Text>
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
  hint: {
    textAlign: 'left',
    fontSize: 13,
    color: '#00000080',
  },
});

export default ExchangeScreen;
