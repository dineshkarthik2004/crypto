export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: amount < 10 ? 4 : 2,
  }).format(amount);
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }
  return num.toFixed(2);
};

export const formatPercentage = (percent: number): string => {
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
};

export const getPercentageColorClass = (percent: number): string => {
  if (percent > 0) return 'text-green-500';
  if (percent < 0) return 'text-red-500';
  return 'text-gray-500';
};

export const formatSupply = (supply: number, symbol: string): string => {
  return `${supply.toFixed(2)}M ${symbol}`;
};