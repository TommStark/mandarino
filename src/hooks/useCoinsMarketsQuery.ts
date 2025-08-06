import { useQuery } from '@tanstack/react-query';
import { fetchCoinsMarkets } from '../api/coingecko';

export const useCoinsMarketsQuery = ({
  vs_currency,
  page,
  per_page,
  order,
}: {
  vs_currency: string;
  page: number;
  per_page: number;
  order: string;
}) => {
  return useQuery({
    queryKey: ['coinsMarkets', vs_currency, page, per_page, order],
    queryFn: () => fetchCoinsMarkets({ vs_currency, page, per_page, order }),
    staleTime: 1000 * 60,
  });
};
