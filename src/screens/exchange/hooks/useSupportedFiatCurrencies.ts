import { useQuery } from '@tanstack/react-query';
import { fetchSupportedFiatCurrencies } from '../../../api/coingecko';
import { QUERY_TIMINGS } from '../../../constants/http';

export const useSupportedFiatCurrencies = () => {
  return useQuery({
    queryKey: ['supportedFiatCurrencies'],
    queryFn: ({ signal }) => fetchSupportedFiatCurrencies(signal),
    staleTime: QUERY_TIMINGS.fiat.staleTime,
  });
};
