import axios from 'axios';
import { CryptoMarket } from '../types/crypto';

export const fetchCoinsMarkets = async (params: {
  vs_currency: string;
  page: number;
  per_page: number;
  order: string;
}): Promise<CryptoMarket[]> => {
  const { data } = await axios.get<CryptoMarket[]>(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        ...params,
        sparkline: false,
        price_change_percentage: '24h',
      },
    },
  );
  return data;
};

export const fetchExchangeRate = async ({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<number> => {
  const { data } = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: from,
        vs_currencies: to,
      },
    },
  );
  return data?.[from]?.[to];
};

export const fetchSupportedFiatCurrencies = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(
    'https://api.coingecko.com/api/v3/simple/supported_vs_currencies',
  );
  return data;
};
