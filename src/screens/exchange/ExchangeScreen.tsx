import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
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
import { CryptoMarket } from '../../types/coingecko';
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
  sheetRefs: {
    crypto: React.RefObject<ActionSheetRef>;
    fiat: React.RefObject<ActionSheetRef>;
  },
) {
  const fromSymbol = coin.symbol.toUpperCase();

  if (direction === 'cryptoToFiat') {
    return {
      fromBox: {
        icon: coin.image,
        symbol: fromSymbol,
        isFiat: false,
        onPress: () => sheetRefs.crypto.current?.show(),
        placeholder: '0.00',
      },
      toBox: {
        icon: fiat.flag,
        symbol: fiat.code.toUpperCase(),
        isFiat: true,
        onPress: () => sheetRefs.fiat.current?.show(),
        placeholder: '0.00',
      },
    };
  }
  return {
    fromBox: {
      icon: fiat.flag,
      symbol: fiat.code.toUpperCase(),
      isFiat: true,
      onPress: () => sheetRefs.fiat.current?.show(),
      placeholder: '0.00',
    },
    toBox: {
      icon: coin.image,
      symbol: fromSymbol,
      isFiat: false,
      onPress: () => sheetRefs.crypto.current?.show(),
      placeholder: '0.00',
    },
  };
}

const MottoSpyMode = () => {
  return (
    <Pressable accessibilityRole="summary" style={styles.motto} hitSlop={8}>
      <Text style={styles.mottoTitle}>👀 Modo espiar precios</Text>
      <Text style={styles.mottoSub}>
        Te mostramos la cotización… pero la compra queda en tus manos.
      </Text>
    </Pressable>
  );
};

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

  const { data: exchangeRate } = useExchangeRate(
    selectedCoin.id,
    selectedFiat.code,
  );

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const convert = (input: string, directionParam: Direction = direction) => {
    const numericValue = parseFloat(input.replace(',', '.') || '0');
    if (!isNaN(numericValue) && exchangeRate) {
      if (directionParam === 'cryptoToFiat') {
        return (numericValue * exchangeRate).toFixed(2);
      } else {
        if (exchangeRate === 0) return '0';
        return (numericValue / exchangeRate).toFixed(8);
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
  }, [exchangeRate, selectedCoin, selectedFiatCode, direction]);

  const handleSwap = () => {
    const newDirection: Direction =
      direction === 'cryptoToFiat' ? 'fiatToCrypto' : 'cryptoToFiat';
    setDirection(newDirection);
    setFromValue('');
    setToValue('');
  };

  const resetAllState = useCallback(() => {
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
        resetAllState();
      };
    }, [resetAllState]),
  );

  const { fromBox, toBox } = buildBoxes(direction, selectedCoin, selectedFiat, {
    crypto: cryptoSheetRef,
    fiat: fiatSheetRef,
  });

  const formatCryptoHint = (value: number, precision: number = 8) => {
    const formatted = value
      .toFixed(precision)
      .replace(/0+$/, '')
      .replace(/\.$/, '');
    return formatted.replace('.', ',');
  };

  const unitHint = useMemo(() => {
    if (!exchangeRate || exchangeRate === 0) return 'Sin precio';
    if (direction === 'cryptoToFiat') {
      return `1 ${selectedCoin.symbol.toUpperCase()} ≈ ${exchangeRate} ${selectedFiat.code.toUpperCase()}`;
    }
    const inverseRate = 1 / exchangeRate;
    return `1 ${selectedFiat.code.toUpperCase()} ≈ ${formatCryptoHint(
      inverseRate,
    )} ${selectedCoin.symbol.toUpperCase()}`;
  }, [exchangeRate, direction, selectedCoin.symbol, selectedFiat.code]);

  return (
    <ScreenWrapper title="Exchange">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <MottoSpyMode />

          <ExchangeBox
            icon={fromBox.icon}
            symbol={fromBox.symbol}
            value={fromValue}
            placeholder={fromBox.placeholder}
            onChange={handleChange}
            onPress={fromBox.onPress}
            isFiat={fromBox.isFiat}
          />

          <Pressable
            onPress={handleSwap}
            style={styles.swapButton}
            hitSlop={10}
          >
            <Text style={styles.swapText}>⇅</Text>
          </Pressable>

          <ExchangeBox
            icon={toBox.icon}
            symbol={toBox.symbol}
            value={toValue}
            placeholder={toBox.placeholder}
            editable={false}
            isFiat={toBox.isFiat}
            onPress={toBox.onPress}
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
  motto: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
    gap: 2,
  },
  mottoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000CC',
  },
  mottoSub: {
    fontSize: 12,
    color: '#00000099',
  },
  mottoMeta: {
    marginTop: 2,
    fontSize: 11,
    color: '#00000066',
  },
});

export default ExchangeScreen;
