import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCoins, fetchCoinsMarketsByIds } from '../api/coingecko';
import type { CryptoMarket } from '../types/crypto';
import useDebouncedValue from './useDebouncedValue';

export function useMarketsSearch({
  vsCurrency,
  q,
  limit = 60,
}: {
  vsCurrency: string;
  q: string;
  limit?: number;
}) {
  const [debouncedQ, isDebouncing] = useDebouncedValue(q, 400);

  const query = useQuery<CryptoMarket[], Error>({
    queryKey: ['markets-search', vsCurrency, debouncedQ, limit],
    queryFn: async () => {
      const qTrim = debouncedQ.trim();
      if (!qTrim) return [];
      const res = await searchCoins(qTrim);
      const ids = (res?.coins ?? [])
        .map(c => c.id)
        .slice(0, Math.min(limit, 100));
      if (!ids.length) return [];
      return await fetchCoinsMarketsByIds({
        vs_currency: vsCurrency,
        ids,
        order: 'market_cap_desc',
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
