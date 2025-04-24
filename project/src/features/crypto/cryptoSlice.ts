import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoAsset, PriceUpdateData } from '../../types/crypto';
import { initialCryptoData } from '../../utils/mockData';

interface CryptoState {
  assets: CryptoAsset[];
  filteredAssets: CryptoAsset[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  assets: initialCryptoData,
  filteredAssets: initialCryptoData,
  searchTerm: '',
  loading: false,
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<PriceUpdateData[]>) => {
      action.payload.forEach(update => {
        const asset = state.assets.find(a => a.id === update.id);
        if (asset) {
          const previousPrice = asset.currentPrice;
          asset.currentPrice = update.currentPrice || previousPrice;
          asset.priceChange1h = update.priceChange1h;
          asset.priceChange24h = update.priceChange24h;
          asset.volume24h = update.volume24h;
          asset.lastUpdate = update.lastUpdate;
          
          // Update sparkline data
          asset.sparklineData = [...asset.sparklineData.slice(1), asset.currentPrice];
        }
      });
      // Update filtered assets
      state.filteredAssets = filterAssets(state.assets, state.searchTerm);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredAssets = filterAssets(state.assets, action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

const filterAssets = (assets: CryptoAsset[], searchTerm: string): CryptoAsset[] => {
  if (!searchTerm) return assets;
  const term = searchTerm.toLowerCase();
  return assets.filter(asset => 
    asset.name.toLowerCase().includes(term) ||
    asset.symbol.toLowerCase().includes(term)
  );
};

export const { updatePrices, setSearchTerm, setError, clearError } = cryptoSlice.actions;

export default cryptoSlice.reducer;