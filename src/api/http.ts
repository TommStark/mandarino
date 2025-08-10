import axios, { AxiosError, AxiosHeaders } from 'axios';
import Config from 'react-native-config';

export const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

const RAW = (Config.COINGECKO_API_KEY ?? '').trim().replace(/^"+|"+$/g, '');
const COINGECKO_API_KEY = RAW.startsWith('CG-') ? RAW : RAW ? `CG-${RAW}` : '';

const cg = axios.create({
  baseURL: COINGECKO_BASE_URL,
  timeout: 10000,
  headers: { Accept: 'application/json' },
  paramsSerializer: { indexes: null },
});

cg.interceptors.request.use(config => {
  if (!COINGECKO_API_KEY) return config;

  if ((config.headers as any)?.set) {
    (config.headers as AxiosHeaders).set(
      'x-cg-demo-api-key',
      COINGECKO_API_KEY,
    );
  } else {
    config.headers = new AxiosHeaders({
      ...(config.headers as any),
      'x-cg-demo-api-key': COINGECKO_API_KEY,
    });
  }

  return config;
});

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
cg.interceptors.response.use(undefined, async (error: AxiosError) => {
  const cfg: any = error.config;
  if (error.response?.status === 429 && (cfg?._retryCount ?? 0) < 3) {
    cfg._retryCount = (cfg._retryCount ?? 0) + 1;
    await sleep(800 * 2 ** (cfg._retryCount - 1));
    return cg(cfg);
  }
  throw error;
});

export default cg;
