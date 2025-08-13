export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const QUERY_TIMINGS = {
  markets: { staleTime: 60_000, gcTime: 10 * 60_000 },
  exchange: { staleTime: 15_000, refetchInterval: 30_000 },
  fiat: { staleTime: 60 * 60 * 1000 },
} as const;

export const RETRY_CONFIG = {
  MAX_RETRIES_429: 3,
  BASE_DELAY_MS: 800,
} as const;
