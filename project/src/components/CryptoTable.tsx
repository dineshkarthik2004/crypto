import React, { useState } from 'react';
import { CryptoAsset } from '../types/crypto';
import PriceChange from './PriceChange';
import SparklineChart from './SparklineChart';
import { formatCurrency, formatLargeNumber } from '../utils/formatters';
import { ArrowDownUp, ArrowDown, ArrowUp } from 'lucide-react';

interface CryptoTableProps {
  assets: CryptoAsset[];
}

type SortField = 'rank' | 'currentPrice' | 'priceChange1h' | 'priceChange24h' | 
  'priceChange7d' | 'marketCap' | 'volume24h';

type SortDirection = 'asc' | 'desc';

const CryptoTable: React.FC<CryptoTableProps> = ({ assets }) => {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return <ArrowDownUp size={14} className="ml-1 opacity-50" />;
    return sortDirection === 'asc' 
      ? <ArrowUp size={14} className="ml-1" /> 
      : <ArrowDown size={14} className="ml-1" />;
  };

  const sortedAssets = React.useMemo(() => {
    return [...assets].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [assets, sortField, sortDirection]);

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-md bg-slate-900 border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-800/50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              <button 
                className="flex items-center font-semibold focus:outline-none"
                onClick={() => handleSort('rank')}
              >
                # {getSortIcon('rank')}
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Asset
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              <button 
                className="flex items-center font-semibold focus:outline-none"
                onClick={() => handleSort('currentPrice')}
              >
                Price {getSortIcon('currentPrice')}
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              <button 
                className="flex items-center font-semibold focus:outline-none"
                onClick={() => handleSort('priceChange1h')}
              >
                1h % {getSortIcon('priceChange1h')}
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              <button 
                className="flex items-center font-semibold focus:outline-none"
                onClick={() => handleSort('priceChange24h')}
              >
                24h % {getSortIcon('priceChange24h')}
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              <button 
                className="flex items-center font-semibold focus:outline-none"
                onClick={() => handleSort('priceChange7d')}
              >
                7d % {getSortIcon('priceChange7d')}
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              <button 
                className="flex items-center font-semibold focus:outline-none"
                onClick={() => handleSort('marketCap')}
              >
                Market Cap {getSortIcon('marketCap')}
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              <button 
                className="flex items-center font-semibold focus:outline-none"
                onClick={() => handleSort('volume24h')}
              >
                Volume (24h) {getSortIcon('volume24h')}
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Supply
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
              Last 7d
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {sortedAssets.map((asset) => (
            <tr 
              key={asset.id} 
              className="hover:bg-slate-800/30 transition-colors"
            >
              <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">
                {asset.rank}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img src={asset.logoUrl} alt={asset.name} className="w-6 h-6 mr-2" />
                  <div>
                    <div className="font-medium text-white">{asset.name}</div>
                    <div className="text-slate-400 text-xs">{asset.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-white font-mono">
                  {formatCurrency(asset.currentPrice)}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <PriceChange value={asset.priceChange1h} animated />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <PriceChange value={asset.priceChange24h} animated />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <PriceChange value={asset.priceChange7d} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-slate-300 font-mono">
                {formatCurrency(asset.marketCap).slice(0, 1)}{formatLargeNumber(asset.marketCap)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-slate-300 font-mono">
                {formatCurrency(asset.volume24h).slice(0, 1)}{formatLargeNumber(asset.volume24h)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-slate-300 font-mono">
                  {formatLargeNumber(asset.circulatingSupply)} {asset.symbol}
                </div>
                {asset.maxSupply && (
                  <div className="text-xs text-slate-400 mt-1">
                    Max: {formatLargeNumber(asset.maxSupply)}
                  </div>
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex justify-end">
                  <SparklineChart data={asset.sparklineData} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;