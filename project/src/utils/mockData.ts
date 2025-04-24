import { CryptoAsset } from '../types/crypto';

const generateSparklineData = (): number[] => {
  const data: number[] = [];
  let value = 100 + Math.random() * 20;
  
  for (let i = 0; i < 168; i++) { // 7 days * 24 hours
    const change = (Math.random() - 0.5) * 2;
    value += change;
    value = Math.max(value, 50);
    data.push(value);
  }
  
  return data;
};

export const initialCryptoData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    currentPrice: 93759.48,
    priceChange1h: 0.43,
    priceChange24h: 0.93,
    priceChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    sparklineData: generateSparklineData(),
    lastUpdate: Date.now(),
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    currentPrice: 1802.46,
    priceChange1h: 0.60,
    priceChange24h: 3.21,
    priceChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    sparklineData: generateSparklineData(),
    lastUpdate: Date.now(),
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logoUrl: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    currentPrice: 1.00,
    priceChange1h: 0.00,
    priceChange24h: 0.00,
    priceChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    sparklineData: generateSparklineData(),
    lastUpdate: Date.now(),
  },
  {
    id: 'ripple',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    logoUrl: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
    currentPrice: 2.22,
    priceChange1h: 0.46,
    priceChange24h: 0.54,
    priceChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    sparklineData: generateSparklineData(),
    lastUpdate: Date.now(),
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    logoUrl: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    currentPrice: 606.65,
    priceChange1h: 0.09,
    priceChange24h: -1.20,
    priceChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    sparklineData: generateSparklineData(),
    lastUpdate: Date.now(),
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    currentPrice: 151.51,
    priceChange1h: 0.53,
    priceChange24h: 1.26,
    priceChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    sparklineData: generateSparklineData(),
    lastUpdate: Date.now(),
  }
];