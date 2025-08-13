import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { fetchCoinsMarkets } from '../../../api/coingecko';
import type { CryptoMarket } from '../../../types/coingecko';
import { HTTP_STATUS, QUERY_TIMINGS } from '../../../constants/http';

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
  return useQuery<CryptoMarket[], AxiosError>({
    queryKey: ['coins-markets', params],
    queryFn: () =>
      fetchCoinsMarkets({
        vs_currency: params.vs_currency,
        page: params.page,
        per_page: Math.min(params.per_page, 250),
        order: params.order,
      }),
    staleTime: QUERY_TIMINGS.markets.staleTime,
    refetchOnWindowFocus: false,
    retry: (count, error) => {
      const status = error.response?.status;
      if (
        status === HTTP_STATUS.UNAUTHORIZED ||
        status === HTTP_STATUS.FORBIDDEN
      ) {
        return false;
      }
      return count < 2;
    },
  });
}
