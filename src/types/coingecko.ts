/** -------- Coins / Markets -------- */

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface CryptoMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
}

/** -------- /search -------- */

export interface SearchCoin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
}

export interface SearchResponse {
  coins: SearchCoin[];
  exchanges?: unknown[];
  icos?: unknown[];
  categories?: string[];
  nfts?: unknown[];
}

/** -------- /simple/price --------*/

export type SimplePriceResponse<
  From extends string = string,
  To extends string = string,
> = Record<From, Record<To, number>>;

/** -------- /simple/supported_vs_currencies -------- */

export type VsCurrency = string;
export type SupportedVsCurrenciesResponse = VsCurrency[];

/** -------- Ordenamientos soportados por /coins/markets -------- */

export type MarketsOrder =
  | 'market_cap_desc'
  | 'market_cap_asc'
  | 'price_desc'
  | 'price_asc'
  | 'volume_desc'
  | 'volume_asc';
