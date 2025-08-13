import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import Config from 'react-native-config';
import { HTTP_STATUS, RETRY_CONFIG } from '../constants/http';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const COINGECKO_API_KEY = Config.COINGECKO_API_KEY ?? '';

const cg = axios.create({
  baseURL: COINGECKO_BASE_URL,
  timeout: 10000,
  headers: { Accept: 'application/json' },
  paramsSerializer: { indexes: null },
});

cg.interceptors.request.use(config => {
  if (!COINGECKO_API_KEY) return config;

  if (config.headers instanceof AxiosHeaders) {
    config.headers.set('x-cg-demo-api-key', COINGECKO_API_KEY);
  } else {
    config.headers = new AxiosHeaders({
      ...(config.headers as RawAxiosRequestHeaders | undefined),
      'x-cg-demo-api-key': COINGECKO_API_KEY,
    });
  }

  return config;
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type RetriableConfig = AxiosRequestConfig & { _retryCount?: number };

cg.interceptors.response.use(undefined, async (error: AxiosError) => {
  const cfg = error.config as RetriableConfig;
  if (
    error.response?.status === HTTP_STATUS.TOO_MANY_REQUESTS &&
    (cfg._retryCount ?? 0) < RETRY_CONFIG.MAX_RETRIES_429
  ) {
    cfg._retryCount = (cfg._retryCount ?? 0) + 1;
    const delay = RETRY_CONFIG.BASE_DELAY_MS * 2 ** (cfg._retryCount - 1);
    await sleep(delay);
    return cg(cfg);
  }
  throw error;
});

export default cg;
