import React from 'react';
import { useAppSelector } from '../app/hooks';
import CryptoTable from './CryptoTable';
import Header from './Header';
import StatusBar from './StatusBar';
import useWebSocketData from '../hooks/useWebSocketData';

const CryptoTracker: React.FC = () => {
  const { filteredAssets } = useAppSelector(state => state.crypto);
  const { isConnected } = useWebSocketData();
  
  const lastUpdate = filteredAssets.length > 0 
    ? Math.max(...filteredAssets.map(asset => asset.lastUpdate))
    : null;
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Header />
      
      <div className="mb-4">
        <CryptoTable assets={filteredAssets} />
      </div>
      
      <StatusBar lastUpdate={lastUpdate} isConnected={isConnected} />
    </div>
  );
};

export default CryptoTracker;