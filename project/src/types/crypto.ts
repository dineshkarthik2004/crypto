export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logoUrl: string;
  currentPrice: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  sparklineData: number[];
  lastUpdate: number;
}

export interface PriceUpdateData {
  id: string;
  currentPrice: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  volume24h: number;
  lastUpdate: number;
}