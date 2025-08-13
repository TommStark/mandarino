// CryptoCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CryptoMarket } from '../types/coingecko';
import {
  formatAmount,
  formatPercent,
  formatPrice,
  isNum,
  truncate,
} from '../utils/cripto';
import color from '../ui/token/colors';

type Props = {
  coin: CryptoMarket;
  userAmount?: number;
  showUserAmount?: boolean;
};

export const CryptoCard = ({
  coin,
  userAmount,
  showUserAmount = false,
}: Props) => {
  const price = isNum(coin.current_price) ? coin.current_price : null;
  const change = isNum(coin.price_change_percentage_24h_in_currency)
    ? coin.price_change_percentage_24h_in_currency
    : null;

  const isPositive = (change ?? 0) >= 0;

  const priceFormatted = `$${formatPrice(price)}`;
  const changeFormatted = formatPercent(change);

  const nameSafe = truncate(coin.name ?? '', 20);
  const symbolSafe = (coin.symbol ?? '').toUpperCase().slice(0, 6);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconWrapper}>
          {!!coin.image && (
            <Image
              source={{ uri: coin.image }}
              style={styles.iconImage}
              resizeMode="contain"
            />
          )}
        </View>

        <View>
          <Text style={styles.name} numberOfLines={1}>
            {nameSafe}
          </Text>

          {showUserAmount && (
            <Text style={styles.amount} numberOfLines={1}>
              {formatAmount(userAmount)} {symbolSafe}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.price,
            priceFormatted.length > 12 && styles.priceSmall,
            priceFormatted.length > 16 && styles.priceXSmall,
          ]}
          numberOfLines={1}
        >
          {priceFormatted}
        </Text>
        <Text
          style={[
            styles.change,
            change == null
              ? styles.neutral
              : isPositive
              ? styles.green
              : styles.red,
          ]}
          numberOfLines={1}
        >
          {changeFormatted}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: color.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '58%',
  },
  iconWrapper: {
    backgroundColor: color.brandSoftBg2,
    borderRadius: 999,
    width: 40,
    height: 40,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: color.black,
    maxWidth: 170,
  },
  amount: {
    fontSize: 12,
    color: color.blueGray600,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    maxWidth: '40%',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: color.black,
    maxWidth: 140,
  },
  priceSmall: { fontSize: 14 },
  priceXSmall: { fontSize: 12 },
  change: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  green: { color: color.success },
  red: { color: color.danger },
  neutral: { color: color.blueGray600 },
});

export default CryptoCard;
