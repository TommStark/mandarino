import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import HttpErrorModal from '../../components/Shared/HttpErrorModal';
import SearchBar from '../../components/CryptoList/SearchBar';
import SortControls from '../../components/CryptoList/SortControls';
import ResultsList from '../../components/CryptoList/ResultsList';
import { SkeletonCoinList } from '../../components/Shared/SkeletonCoinRow';
import { useCryptoListData } from '../../hooks/useCryptoListData';
import type { SortBy, SortDir } from '../../hooks/useMarketsInfinite';

const CURRENCY_OPTIONS = ['usd', 'ars', 'eur', 'mxn', 'brl', 'btc', 'eth'];

export default function CryptoListScreen() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('market_cap');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [vsCurrency, setVsCurrency] = useState('usd');

  const {
    items,
    isFetchingList,
    isFetchingNext,
    hasNext,
    showSkeleton,
    error,
    onLoadMore,
    onRefresh,
    onMomentumBegin,
  } = useCryptoListData({ vsCurrency, search, sortBy, sortDir, perPage: 20 });

  if (error) {
    return (
      <ScreenWrapper>
        <HttpErrorModal />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="Crypto List">
      <View style={styles.header}>
        <SearchBar value={search} onChange={setSearch} />
        <SortControls
          sortBy={sortBy}
          sortDir={sortDir}
          onChangeSortBy={setSortBy}
          onToggleDir={() => setSortDir(d => (d === 'desc' ? 'asc' : 'desc'))}
          vsCurrency={vsCurrency}
          onChangeCurrency={setVsCurrency}
          currencyOptions={CURRENCY_OPTIONS}
          showCurrencyNameOnChip={false}
        />
      </View>

      <ResultsList
        items={items}
        isFetchingList={isFetchingList}
        isFetchingNext={isFetchingNext}
        hasNext={hasNext}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
        onMomentumBegin={onMomentumBegin}
        showSkeleton={showSkeleton}
        SkeletonComponent={<SkeletonCoinList count={8} />}
      />
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  header: { paddingBottom: 4, gap: 8 },
});
