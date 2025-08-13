import cg from './http';
import {
  CryptoMarket,
  MarketsOrder,
  SearchResponse,
  SimplePriceResponse,
  SupportedVsCurrenciesResponse,
} from '../types/coingecko';

export const fetchCoinsMarkets = async (
  params: {
    vs_currency: string;
    page: number;
    per_page: number;
    order: MarketsOrder | string;
    category?: string | null;
  },
  signal?: AbortSignal,
): Promise<CryptoMarket[]> => {
  const { category, ...rest } = params;
  const { data } = await cg.get<CryptoMarket[]>('/coins/markets', {
    params: {
      ...rest,
      ...(category ? { category } : {}),
      sparkline: false,
      price_change_percentage: '24h',
    },
    signal,
  });
  return data;
};

export const searchCoins = async (
  query: string,
  signal?: AbortSignal,
): Promise<SearchResponse> => {
  const { data } = await cg.get<SearchResponse>('/search', {
    params: { query },
    signal,
  });
  return data;
};

export const fetchCoinsMarketsByIds = async (
  {
    vs_currency,
    ids,
    order = 'market_cap_desc',
  }: { vs_currency: string; ids: string[]; order?: MarketsOrder },
  signal?: AbortSignal,
): Promise<CryptoMarket[]> => {
  if (!ids.length) return [];
  const { data } = await cg.get<CryptoMarket[]>('/coins/markets', {
    params: {
      vs_currency,
      ids: ids.join(','),
      order,
      per_page: Math.min(ids.length, 250),
      page: 1,
      sparkline: false,
      price_change_percentage: '24h',
    },
    signal,
  });
  return data;
};

export const fetchExchangeRate = async <From extends string, To extends string>(
  { from, to }: { from: From; to: To },
  signal?: AbortSignal,
): Promise<number> => {
  const { data } = await cg.get<SimplePriceResponse<From, To>>(
    '/simple/price',
    {
      params: { ids: from, vs_currencies: to },
      signal,
    },
  );
  return (data?.[from]?.[to] ?? NaN) as number;
};

export const fetchSupportedFiatCurrencies = async (
  signal?: AbortSignal,
): Promise<SupportedVsCurrenciesResponse> => {
  const { data } = await cg.get<SupportedVsCurrenciesResponse>(
    '/simple/supported_vs_currencies',
    { signal },
  );
  return data;
};
