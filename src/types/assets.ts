export type CryptoAsset = {
  kind: 'crypto';
  id: string;
  symbol: string;
  name: string;
  iconUri?: string;
};

export type FiatAsset = {
  kind: 'fiat';
  code: string;
  name: string;
  flag: string;
};

export type Asset = CryptoAsset | FiatAsset;
