export type Holdings = {
  BTC: number;
  ETH: number;
  USDT: number;
  XRP: number;
  BNB: number;
};

export type UserData = {
  name: string;
  email: string;
  avatarUrl: string;
  totalBalanceUSD: number;
  holdings: Holdings;
  balanceChange: { amount: number; percent: number };
};

export type Wallet = {
  address: string;
  favorite: boolean;
  scannedAt: number;
};
