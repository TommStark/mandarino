import { useCallback, useMemo, useRef } from 'react';
import { useMarketsSearch } from './useMarketsSearch';
import {
  useMarketsInfinite,
  type SortBy,
  type SortDir,
} from './useMarketsInfinite';
import { CryptoMarket } from '../../../types/coingecko';

export type UseCryptoListDataParams = {
  vsCurrency: string;
  search: string;
  sortBy: SortBy;
  sortDir: SortDir;
  perPage?: number;
  category?: string | null;
};

export function useCryptoListData({
  vsCurrency,
  search,
  sortBy,
  sortDir,
  perPage = 20,
  category = null,
}: UseCryptoListDataParams) {
  const isSearching = search.trim().length > 0;

  const infiniteQuery = useMarketsInfinite({
    vsCurrency,
    perPage,
    sortBy,
    sortDir,
    category,
  });

  const searchQuery = useMarketsSearch({
    vsCurrency,
    q: search,
    limit: 60,
    sortBy,
    sortDir,
  });

  const items = useMemo<CryptoMarket[]>(() => {
    const arr = (isSearching ? searchQuery.items : infiniteQuery.items) ?? [];
    const seen = new Set<string>();
    return arr.filter(it => {
      const key = String(it.id);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [isSearching, searchQuery.items, infiniteQuery.items]);

  const isLoading = isSearching
    ? searchQuery.isLoading
    : infiniteQuery.isLoading;
  const isFetchingList = isSearching
    ? searchQuery.isFetching
    : infiniteQuery.isFetching;
  const isFetchingNext = isSearching ? false : infiniteQuery.isFetchingNextPage;
  const hasNext = isSearching ? false : infiniteQuery.hasNextPage;
  const error = isSearching ? searchQuery.error : infiniteQuery.error;

  const showSkeleton =
    (isSearching &&
      (searchQuery.isDebouncing ||
        !searchQuery.isFetched ||
        searchQuery.isFetching ||
        searchQuery.isLoading)) ||
    (!isSearching && infiniteQuery.isLoading);

  const momentumRef = useRef(false);
  const onMomentumBegin = () => {
    momentumRef.current = false;
  };

  const onLoadMore = useCallback(() => {
    if (
      isSearching ||
      momentumRef.current ||
      !hasNext ||
      isFetchingNext ||
      infiniteQuery.isFetching
    )
      return;
    momentumRef.current = true;
    infiniteQuery
      .fetchNextPage()
      .finally(() => setTimeout(() => (momentumRef.current = false), 120));
  }, [isSearching, hasNext, isFetchingNext, infiniteQuery]);

  const onRefresh = useCallback(() => {
    if (isSearching) searchQuery.refetch();
    else infiniteQuery.refetchFirstPage();
  }, [isSearching, searchQuery, infiniteQuery]);

  return {
    items,
    isLoading,
    isFetchingList,
    isFetchingNext,
    hasNext,
    showSkeleton,
    error,
    onLoadMore,
    onRefresh,
    onMomentumBegin,
  };
}
