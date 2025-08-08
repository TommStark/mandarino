import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CryptoMarket } from '../types/crypto';

type Props = {
  coin: CryptoMarket;
  userAmount?: number;
};

export const CryptoCard = ({ coin, userAmount }: Props) => {
  const isPositive = coin.price_change_percentage_24h_in_currency >= 0;

  const priceFormatted = `$${coin.current_price.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const changeFormatted = `${isPositive ? '▲' : '▼'} ${Math.abs(
    coin.price_change_percentage_24h_in_currency,
  ).toFixed(2)}%`;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconWrapper}>
          <Image
            source={{ uri: coin.image }}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.name}>{coin.name}</Text>
          {userAmount !== undefined ? (
            <Text style={styles.amount}>
              {userAmount.toFixed(4)} {coin.symbol.toUpperCase()}
            </Text>
          ) : (
            <Text style={styles.amount}>•••••••</Text>
          )}
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>{priceFormatted}</Text>
        <Text style={[styles.change, isPositive ? styles.green : styles.red]}>
          {changeFormatted}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#fff5eb',
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
    color: '#000',
  },
  amount: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  change: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  green: {
    color: '#00c853',
  },
  red: {
    color: '#d50000',
  },
});
