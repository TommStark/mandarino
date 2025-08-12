import { useQuery } from '@tanstack/react-query';
import { fetchCoinsMarkets } from '../api/coingecko';
import type { CryptoMarket } from '../types/coingecko';

type Params = {
  vs_currency: string;
  page: number;
  per_page: number;
  order:
    | 'market_cap_desc'
    | 'market_cap_asc'
    | 'price_desc'
    | 'price_asc'
    | 'volume_desc'
    | 'volume_asc';
};

export function useCoinsMarketsQuery(params: Params) {
  return useQuery<CryptoMarket[], Error>({
    queryKey: ['coins-markets', params],
    queryFn: () =>
      fetchCoinsMarkets({
        vs_currency: params.vs_currency,
        page: params.page,
        per_page: Math.min(params.per_page, 250),
        order: params.order,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: (count, error: any) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) return false;
      return count < 2;
    },
  });
}
