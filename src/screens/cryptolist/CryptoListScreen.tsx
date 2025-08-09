import React, { useState } from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useCoinsMarketsQuery } from '../../hooks/useCoinsMarketsQuery';
import { CryptoCard } from '../../components/CryptoCard';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';

export default function CryptoListScreen() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useCoinsMarketsQuery({
    vs_currency: 'ars',
    page,
    per_page: 20,
    order: 'market_cap_desc',
  });

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Error cargando criptos</Text>;

  return (
    <ScreenWrapper title="Crypto List">
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CryptoCard coin={item} />}
        onEndReached={() => setPage(prev => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
        contentContainerStyle={styles.contentContainer}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 16,
  },
});
