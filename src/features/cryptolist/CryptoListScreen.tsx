import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import HttpErrorModal from '../../components/Shared/HttpErrorModal';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import ResultsList from './components/ResultsList';
import { SkeletonCoinList } from '../../components/Shared/SkeletonCoinRow';
import { useCryptoListData } from './hooks/useCryptoListData';
import type { SortBy, SortDir } from './hooks/useMarketsInfinite';
import { CURRENCY_OPTIONS } from './constants/currencies';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './CryptoListScreen.styles';
import { te } from './i18n/te';
import { t } from 'i18next';

export default function CryptoListScreen() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('market_cap');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [vsCurrency, setVsCurrency] = useState('usd');

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch('');
      };
    }, []),
  );

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
        <HttpErrorModal
          title={t('shared:httpError.title')}
          message={t('shared:httpError.message')}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title={te('title')} blurAmount={10}>
      <View style={styles.header}>
        <SearchBar value={search} onChange={setSearch} />
        <SortControls
          sortBy={sortBy}
          sortDir={sortDir}
          onChangeSortBy={setSortBy}
          onToggleDir={() =>
            setSortDir(prevDir => (prevDir === 'desc' ? 'asc' : 'desc'))
          }
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
