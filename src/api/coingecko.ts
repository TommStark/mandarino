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
