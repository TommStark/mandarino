import { useQuery } from '@tanstack/react-query';
import { fetchSupportedFiatCurrencies } from '../api/coingecko';

export const useSupportedFiatCurrencies = () => {
  return useQuery({
    queryKey: ['supportedFiatCurrencies'],
    queryFn: fetchSupportedFiatCurrencies,
    staleTime: 1000 * 60 * 60,
  });
};
