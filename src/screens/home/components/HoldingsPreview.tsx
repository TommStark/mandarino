import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useCoinsMarketsQuery } from '../../exchange/hooks/useCoinsMarketsQuery';
import { CryptoCard } from '../../../components/CryptoCard/CryptoCard';
import { useUser } from '../../../context/UserContext';
import HttpErrorModal from '../../../components/Shared/HttpErrorModal';
import { SkeletonCoinList } from '../../../components/Shared/SkeletonCoinRow';
import { styles } from './HoldingsPreview.styles';
import { th } from '../i18n/t';

const ListSeparator = () => <View style={styles.separator} />;

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
        <Text style={styles.title}>{th('title')}</Text>
        <Text style={styles.viewAll}>{th('viewAll')}</Text>
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
                showUserAmount
              />
            );
          }}
          ItemSeparatorComponent={ListSeparator}
        />
      )}
    </View>
  );
};
