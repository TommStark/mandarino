import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRate } from '../api/coingecko';

export const useExchangeRate = (from: string, to: string) => {
  return useQuery({
    queryKey: ['exchangeRate', from, to],
    queryFn: () => fetchExchangeRate({ from, to }),
    enabled: !!from && !!to,
  });
};
