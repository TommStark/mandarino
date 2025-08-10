import { CryptoMarket } from '../types/crypto';
import cg from './http';

export const fetchCoinsMarkets = async (params: {
  vs_currency: string;
  page: number;
  per_page: number;
  order: string;
}): Promise<CryptoMarket[]> => {
  const { data } = await cg.get<CryptoMarket[]>('/coins/markets', {
    params: { ...params, sparkline: false, price_change_percentage: '24h' },
  });
  return data;
};

export const searchCoins = async (query: string) => {
  const { data } = await cg.get('/search', {
    params: { query },
  });
  return data as {
    coins: Array<{
      id: string;
      name: string;
      symbol: string;
      thumb: string;
      market_cap_rank: number | null;
    }>;
  };
};

export const fetchCoinsMarketsByIds = async ({
  vs_currency,
  ids,
  order = 'market_cap_desc',
}: {
  vs_currency: string;
  ids: string[];
  order?:
    | 'market_cap_desc'
    | 'market_cap_asc'
    | 'price_desc'
    | 'price_asc'
    | 'volume_desc'
    | 'volume_asc';
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

export const fetchExchangeRate = async ({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<number> => {
  const { data } = await cg.get('/simple/price', {
    params: { ids: from, vs_currencies: to },
  });
  return data?.[from]?.[to];
};

export const fetchSupportedFiatCurrencies = async (): Promise<string[]> => {
  const { data } = await cg.get<string[]>('/simple/supported_vs_currencies');
  return data;
};
