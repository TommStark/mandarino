import cg from './http';
import {
  CryptoMarket,
  MarketsOrder,
  SearchResponse,
  SimplePriceResponse,
  SupportedVsCurrenciesResponse,
} from '../types/coingecko';

export const fetchCoinsMarkets = async (params: {
  vs_currency: string;
  page: number;
  per_page: number;
  order: MarketsOrder | string; // por si querés algo custom futuro
}): Promise<CryptoMarket[]> => {
  const { data } = await cg.get<CryptoMarket[]>('/coins/markets', {
    params: { ...params, sparkline: false, price_change_percentage: '24h' },
  });
  return data;
};

export const searchCoins = async (query: string): Promise<SearchResponse> => {
  const { data } = await cg.get<SearchResponse>('/search', {
    params: { query },
  });
  return data;
};

export const fetchCoinsMarketsByIds = async ({
  vs_currency,
  ids,
  order = 'market_cap_desc',
}: {
  vs_currency: string;
  ids: string[];
  order?: MarketsOrder;
}): Promise<CryptoMarket[]> => {
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
  });
  return data;
};

export const fetchExchangeRate = async <
  From extends string,
  To extends string,
>({
  from,
  to,
}: {
  from: From;
  to: To;
}): Promise<number> => {
  const { data } = await cg.get<SimplePriceResponse<From, To>>(
    '/simple/price',
    {
      params: { ids: from, vs_currencies: to },
    },
  );
  return (data?.[from]?.[to] ?? NaN) as number;
};

export const fetchSupportedFiatCurrencies =
  async (): Promise<SupportedVsCurrenciesResponse> => {
    const { data } = await cg.get<SupportedVsCurrenciesResponse>(
      '/simple/supported_vs_currencies',
    );
    return data;
  };
