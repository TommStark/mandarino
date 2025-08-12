// src/hooks/useExchangeRateQuery.ts
import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRate } from '../api/coingecko';

export const useExchangeRateQuery = (
  from: string,
  to: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['exchange-rate', from, to],
    queryFn: () => fetchExchangeRate({ from, to }),
    enabled,
    refetchInterval: 30_000,
    staleTime: 15_000,
    retry: 2,
  });
};
