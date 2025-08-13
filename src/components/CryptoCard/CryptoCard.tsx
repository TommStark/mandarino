import React from 'react';
import { View, Text, Image } from 'react-native';
import { CryptoMarket } from '../../types/coingecko';
import {
  formatAmount,
  formatPercent,
  formatPrice,
  isNum,
  truncate,
} from '../../utils/cripto';
import { styles } from './CryptoCard.styles';

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

export default CryptoCard;
