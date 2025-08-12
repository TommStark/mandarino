import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCoins, fetchCoinsMarketsByIds } from '../api/coingecko';
import type { CryptoMarket } from '../types/coingecko';
import useDebouncedValue from './useDebouncedValue';
import type { SortBy, SortDir } from './useMarketsInfinite';

function mapOrder(sortBy: SortBy, sortDir: SortDir) {
  if (sortBy === 'market_cap') {
    return sortDir === 'asc' ? 'market_cap_asc' : 'market_cap_desc';
  }
  if (sortBy === 'price') {
    return sortDir === 'asc' ? 'price_asc' : 'price_desc';
  }
  // volume
  return sortDir === 'asc' ? 'volume_asc' : 'volume_desc';
}

export function useMarketsSearch({
  vsCurrency,
  q: queryText,
  limit = 60,
  sortBy = 'market_cap',
  sortDir = 'desc',
}: {
  vsCurrency: string;
  q: string;
  limit?: number;
  sortBy?: SortBy;
  sortDir?: SortDir;
}) {
  const [debouncedQuery, isDebouncing] = useDebouncedValue(queryText, 400);
  const order = mapOrder(sortBy, sortDir);

  const query = useQuery<CryptoMarket[], Error>({
    queryKey: ['markets-search', vsCurrency, debouncedQuery, limit, order],
    queryFn: async () => {
      const trimmedQuery = debouncedQuery.trim();
      if (!trimmedQuery) return [];
      const searchResponse = await searchCoins(trimmedQuery);
      const coinIds = (searchResponse?.coins ?? [])
        .map(coin => coin.id)
        .slice(0, Math.min(limit, 100));
      if (!coinIds.length) return [];
      return await fetchCoinsMarketsByIds({
        vs_currency: vsCurrency,
        ids: coinIds,
        order,
      });
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const items = useMemo(() => query.data ?? [], [query.data]);

  return {
    items,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetched: query.isFetched,
    isDebouncing,
    refetch: query.refetch,
    error: query.error ?? null,
  };
}
