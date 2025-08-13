/* eslint-disable react-native/no-inline-styles */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import { useExchangeRate } from './hooks/useExchangeRate';
import { CryptoMarket } from '../../types/coingecko';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { getCurrencyName, getFlag } from '../../utils/fiat';
import { ExchangeBox } from './components/ExchangeBox';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { isIOS } from '../../utils/openAppSettings';
import color from '../../ui/token/colors';
import SelectFiatSheet from './components/SelectFiatSheet';
import SelectCryptoSheet from './components/SelectCryptoSheet';
import { styles } from './ExchangeScreen.styles';
import { te } from './i18n/te';

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

const buildBoxes = (
  direction: Direction,
  coin: CryptoMarket,
  fiat: { code: string; name: string; flag: string },
  sheetRefs: {
    crypto: React.RefObject<ActionSheetRef>;
    fiat: React.RefObject<ActionSheetRef>;
  },
) => {
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
};

const MottoSpyMode = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Pressable accessibilityRole="summary" style={styles.motto} hitSlop={8}>
      <Text style={styles.mottoTitle}>{title}</Text>
      <Text style={styles.mottoSub}>{subtitle}</Text>
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
    if (!exchangeRate || exchangeRate === 0) return te('noPrice');
    if (direction === 'cryptoToFiat') {
      return te('unitHint.cryptoToFiat', {
        crypto: selectedCoin.symbol.toUpperCase(),
        fiat: selectedFiat.code.toUpperCase(),
        rate: exchangeRate,
      });
    }
    const inverseRate = 1 / exchangeRate;
    return te('unitHint.fiatToCrypto', {
      fiat: selectedFiat.code.toUpperCase(),
      crypto: selectedCoin.symbol.toUpperCase(),
      rate: formatCryptoHint(inverseRate),
    });
  }, [exchangeRate, direction, selectedCoin.symbol, selectedFiat.code]);

  return (
    <ScreenWrapper title={te('exchangeTitle')} blurAmount={25}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={isIOS ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <MottoSpyMode
            title={te('spyModeTitle')}
            subtitle={te('spyModeSubtitle')}
          />

          <ExchangeBox
            icon={fromBox.icon}
            symbol={fromBox.symbol}
            value={fromValue}
            placeholder={
              fromBox.isFiat ? te('placeholderFiat') : te('placeholderCrypto')
            }
            onChange={handleChange}
            onPress={fromBox.onPress}
            isFiat={fromBox.isFiat}
          />

          <Pressable
            onPress={handleSwap}
            style={styles.swapButton}
            hitSlop={20}
          >
            <Text style={styles.swapText}>
              <Icon source="sync" size={24} color={color.black} />
            </Text>
          </Pressable>

          <ExchangeBox
            icon={toBox.icon}
            symbol={toBox.symbol}
            value={toValue}
            placeholder={
              toBox.isFiat ? te('placeholderFiat') : te('placeholderCrypto')
            }
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

export default ExchangeScreen;
