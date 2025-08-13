import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useCoinsMarketsQuery } from '../../hooks/useCoinsMarketsQuery';
import { CryptoCard } from '../CryptoCard';
import { useUser } from '../../context/UserContext';
import HttpErrorModal from '../Shared/HttpErrorModal';
import { SkeletonCoinList } from '../Shared/SkeletonCoinRow';
import color from '../../ui/token/colors';

export const HoldingsPreview = () => {
  const { data, isLoading, isError } = useCoinsMarketsQuery({
    vs_currency: 'usd',
    page: 1,
    per_page: 5,
    order: 'market_cap_desc',
  });

  const { user, showBalances } = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Tus Crypto</Text>
        <Text style={styles.viewAll}>Ver Todo</Text>
      </View>

      {isLoading && <SkeletonCoinList count={5} />}

      {!isLoading && (isError || !data || data.length === 0) && (
        <HttpErrorModal />
      )}

      {!isLoading && data && data.length > 0 && (
        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const symbol = item.symbol.toUpperCase();
            const userAmount =
              user.holdings[symbol as keyof typeof user.holdings] ?? 0;

            return (
              <CryptoCard
                coin={item}
                userAmount={showBalances ? userAmount : undefined}
                showUserAmount={true}
              />
            );
          }}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
};

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
    color: color.black,
  },
  viewAll: {
    fontSize: 14,
    color: color.brand,
  },
  separator: {
    height: 4,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
});
