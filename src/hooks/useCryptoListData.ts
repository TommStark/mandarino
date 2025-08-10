import { useCallback, useMemo, useRef } from 'react';
import {
  useMarketsInfinite,
  type SortBy,
  type SortDir,
} from './useMarketsInfinite';
import { useMarketsSearch } from './useMarketsSearch';
import type { CryptoMarket } from '../types/crypto';

export type UseCryptoListDataParams = {
  vsCurrency: string;
  search: string;
  sortBy: SortBy;
  sortDir: SortDir;
  perPage?: number;
};

export function useCryptoListData({
  vsCurrency,
  search,
  sortBy,
  sortDir,
  perPage = 20,
}: UseCryptoListDataParams) {
  const searching = search.trim().length > 0;

  const inf = useMarketsInfinite({ vsCurrency, perPage, sortBy, sortDir });
  const sea = useMarketsSearch({ vsCurrency, q: search, limit: 60 });

  const items = useMemo<CryptoMarket[]>(
    () => (searching ? sea.items : inf.items) ?? [],
    [searching, sea.items, inf.items],
  );

  const isLoading = searching ? sea.isLoading : inf.isLoading;
  const isFetchingList = searching ? sea.isFetching : inf.isFetching;
  const isFetchingNext = searching ? false : inf.isFetchingNextPage;
  const hasNext = searching ? false : inf.hasNextPage;
  const error = searching ? sea.error : inf.error;

  const showSkeleton =
    (searching &&
      (sea.isDebouncing ||
        !sea.isFetched ||
        sea.isFetching ||
        sea.isLoading)) ||
    (!searching && inf.isLoading);

  const momentum = useRef(false);
  const onMomentumBegin = () => {
    momentum.current = false;
  };

  const onLoadMore = useCallback(() => {
    if (
      searching ||
      momentum.current ||
      !hasNext ||
      isFetchingNext ||
      inf.isFetching
    )
      return;
    momentum.current = true;
    inf
      .fetchNextPage()
      .finally(() => setTimeout(() => (momentum.current = false), 120));
  }, [searching, hasNext, isFetchingNext, inf]);

  const onRefresh = useCallback(() => {
    if (searching) sea.refetch();
    else inf.refetchFirstPage();
  }, [searching, sea, inf]);

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
