import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRate } from '../api/coingecko';
import { QUERY_TIMINGS } from '../constants/http';

export const useExchangeRateQuery = (
  from: string,
  to: string,
  enabled = true,
  options?: { staleTime?: number; refetchInterval?: number },
) => {
  const staleTime = options?.staleTime ?? QUERY_TIMINGS.exchange.staleTime;
  const baseInterval =
    options?.refetchInterval ?? QUERY_TIMINGS.exchange.refetchInterval;

  const [appActive, setAppActive] = useState(true);
  useEffect(() => {
    const sub = AppState.addEventListener('change', s =>
      setAppActive(s === 'active'),
    );
    return () => sub.remove();
  }, []);

  return useQuery({
    queryKey: ['exchange-rate', from, to],
    queryFn: ({ signal }) => fetchExchangeRate({ from, to }, signal),
    enabled,
    staleTime,
    refetchInterval: appActive ? baseInterval : false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
