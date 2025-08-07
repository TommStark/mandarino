import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useCoinsMarketsQuery } from '../hooks/useCoinsMarketsQuery';
import { CryptoCard } from './CryptoCard';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

type Props = {
  onPressViewAll: () => void;
};

export const HoldingsPreview = ({ onPressViewAll }: Props) => {
  const { data, isLoading, isError } = useCoinsMarketsQuery({
    vs_currency: 'usd',
    page: 1,
    per_page: 5,
    order: 'market_cap_desc',
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your Holdings</Text>
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* HACER UN COMPONENTE APARTE */}
      {isLoading && (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      )}

      {/* TODO: hacer componente aparte */}
      {!isLoading && (isError || !data || data.length === 0) && (
        <Text style={styles.errorText}>
          Ups, tuvimos un problema cargando tus criptos.
        </Text>
      )}

      {!isLoading && data && data.length > 0 && (
        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CryptoCard
              coin={item}
              userAmount={getUserAmountMock(item.symbol)}
            />
          )}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
};

function getUserAmountMock(symbol: string): number {
  switch (symbol.toLowerCase()) {
    case 'btc':
      return 0.0234;
    case 'eth':
      return 0.8456;
    case 'sol':
      return 12.45;
    case 'ada':
      return 2450;
    default:
      return 0.003 * Math.random();
  }
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginTop: 12,
    marginBottom: 24,
  },
  headerRow: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111',
  },
  viewAll: {
    fontSize: 14,
    color: '#FF6600',
  },
  errorText: {
    marginHorizontal: 16,
    color: '#979797ff',
    fontSize: 14,
    marginTop: 8,
  },
  separator: {
    height: 8,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
});
