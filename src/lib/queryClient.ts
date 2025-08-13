import { QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { HTTP_STATUS, QUERY_TIMINGS } from '../constants/http';

const shouldRetry = (failureCount: number, error: unknown) => {
  const status = (error as AxiosError)?.response?.status;

  if (
    status === HTTP_STATUS.BAD_REQUEST ||
    status === HTTP_STATUS.UNAUTHORIZED ||
    status === HTTP_STATUS.FORBIDDEN ||
    status === HTTP_STATUS.NOT_FOUND
  )
    return false;

  if (status === HTTP_STATUS.TOO_MANY_REQUESTS) return false;

  return failureCount < 3;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_TIMINGS.exchange.refetchInterval,
      gcTime: QUERY_TIMINGS.markets.gcTime,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: shouldRetry,
      networkMode: 'online',
    },
    mutations: {
      retry: shouldRetry,
    },
  },
});
