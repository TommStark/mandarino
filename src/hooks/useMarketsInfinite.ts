import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCoinsMarkets } from '../api/coingecko';
import type { CryptoMarket } from '../types/crypto';

export type SortBy = 'market_cap' | 'price' | 'volume';
export type SortDir = 'asc' | 'desc';

function mapOrder(sortBy: SortBy, sortDir: SortDir) {
  if (sortBy === 'market_cap')
    return sortDir === 'asc' ? 'market_cap_asc' : 'market_cap_desc';
  if (sortBy === 'price') return sortDir === 'asc' ? 'price_asc' : 'price_desc';
  return sortDir === 'asc' ? 'volume_asc' : 'volume_desc';
}

export function useMarketsInfinite({
  vsCurrency,
  perPage = 20,
  sortBy = 'market_cap',
  sortDir = 'desc',
}: {
  vsCurrency: string;
  perPage?: number;
  sortBy?: SortBy;
  sortDir?: SortDir;
}) {
  const order = mapOrder(sortBy, sortDir);

  const query = useInfiniteQuery<CryptoMarket[], Error>({
    queryKey: ['markets', vsCurrency, perPage, order],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchCoinsMarkets({
        vs_currency: vsCurrency,
        order,
        per_page: perPage,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) =>
      !lastPage || lastPage.length < perPage ? undefined : allPages.length + 1,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
  });

  const items = useMemo(() => query.data?.pages.flat() ?? [], [query.data]);

  const refetchFirstPage = () => query.refetch();

  return {
    items,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: !!query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    refetchFirstPage,
    error: query.error ?? null,
  };
}
