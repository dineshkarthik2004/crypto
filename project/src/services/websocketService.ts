import { PriceUpdateData } from '../types/crypto';

export class MockWebSocketService {
  private intervalId: number | null = null;
  private callbacks: ((data: PriceUpdateData[]) => void)[] = [];
  private cryptoIds: string[] = [];
  private wsConnection: WebSocket | null = null;

  constructor(cryptoIds: string[]) {
    this.cryptoIds = cryptoIds;
  }

  connect(): void {
    if (this.intervalId !== null) return;

    try {
      // Try to connect to Binance WebSocket (as fallback use mock data)
      this.wsConnection = new WebSocket('wss://stream.binance.com:9443/ws');
      
      this.wsConnection.onopen = () => {
        console.log('WebSocket connected to Binance');
        const subscribeMsg = {
          method: 'SUBSCRIBE',
          params: this.cryptoIds.map(id => `${id.toLowerCase()}usdt@ticker`),
          id: 1
        };
        this.wsConnection?.send(JSON.stringify(subscribeMsg));
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.e === '24hrTicker') {
            const updates = this.transformBinanceData(data);
            this.notifySubscribers([updates]);
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };

      this.wsConnection.onerror = () => {
        console.log('WebSocket error, falling back to mock data');
        this.startMockUpdates();
      };

    } catch (error) {
      console.log('WebSocket connection failed, using mock data');
      this.startMockUpdates();
    }
  }

  private startMockUpdates(): void {
    this.intervalId = window.setInterval(() => {
      const updates = this.generateRandomUpdates();
      this.notifySubscribers(updates);
    }, 1500);
  }

  private transformBinanceData(data: any): PriceUpdateData {
    return {
      id: data.s.toLowerCase().replace('usdt', ''),
      currentPrice: parseFloat(data.c),
      priceChange1h: parseFloat(data.P),
      priceChange24h: parseFloat(data.p),
      priceChange7d: 0,
      volume24h: parseFloat(data.v) * parseFloat(data.c),
      lastUpdate: Date.now(),
    };
  }

  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(callback: (data: PriceUpdateData[]) => void): void {
    this.callbacks.push(callback);
  }

  unsubscribe(callback: (data: PriceUpdateData[]) => void): void {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  private generateRandomUpdates(): PriceUpdateData[] {
    return this.cryptoIds.map(id => {
      const priceChangePercent = (Math.random() - 0.5) * 4;
      const change1h = (Math.random() - 0.5) * 1;
      const change24h = (Math.random() - 0.5) * 2;
      const volumeChangePercent = (Math.random() - 0.5) * 10;
      
      return {
        id,
        currentPrice: 0,
        priceChange1h: change1h,
        priceChange24h: change24h,
        priceChange7d: 0,
        volume24h: 0,
        lastUpdate: Date.now(),
      };
    });
  }

  private notifySubscribers(updates: PriceUpdateData[]): void {
    this.callbacks.forEach(callback => callback(updates));
  }
}

export default MockWebSocketService;