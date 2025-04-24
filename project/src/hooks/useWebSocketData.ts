import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updatePrices } from '../features/crypto/cryptoSlice';
import MockWebSocketService from '../services/websocketService';
import { PriceUpdateData } from '../types/crypto';

export const useWebSocketData = () => {
  const dispatch = useAppDispatch();
  const cryptoAssets = useAppSelector(state => state.crypto.assets);
  const wsRef = useRef<MockWebSocketService | null>(null);
  
  useEffect(() => {
    // Get all crypto IDs from the assets
    const cryptoIds = cryptoAssets.map(asset => asset.id);
    
    // Create a new WebSocket service
    const wsService = new MockWebSocketService(cryptoIds);
    wsRef.current = wsService;
    
    // Subscribe to price updates
    const handlePriceUpdate = (updates: PriceUpdateData[]) => {
      dispatch(updatePrices(updates));
    };
    
    wsService.subscribe(handlePriceUpdate);
    
    // Connect to the WebSocket
    wsService.connect();
    
    // Clean up on unmount
    return () => {
      if (wsService) {
        wsService.unsubscribe(handlePriceUpdate);
        wsService.disconnect();
      }
    };
  }, [dispatch, cryptoAssets]);
  
  return {
    isConnected: wsRef.current !== null,
    reconnect: () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current.connect();
      }
    }
  };
};

export default useWebSocketData;