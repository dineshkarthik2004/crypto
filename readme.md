# Real-Time Crypto Price Tracker

A modern, responsive cryptocurrency price tracking application built with React, Redux Toolkit, and WebSocket integration. Track real-time prices, market caps, and trends for major cryptocurrencies.

![Crypto Tracker Screenshot](https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🚀 Real-time price updates via WebSocket connection
- 📊 Live price changes and market data
- 📱 Fully responsive design
- 🔍 Search functionality for quick asset lookup
- 📈 Interactive sparkline charts
- 🎨 Beautiful UI with dark mode
- ⚡ Fast and efficient state management with Redux Toolkit
- 📦 TypeScript for enhanced type safety

## Tech Stack

- React 18
- Redux Toolkit
- TypeScript
- Tailwind CSS
- Vite
- WebSocket API
- Lucide React Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/                # Redux store setup
├── components/         # React components
├── features/          # Redux slices and features
├── hooks/             # Custom React hooks
├── services/          # WebSocket and API services
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## Features in Detail

### Real-Time Updates
- Live price updates every 1.5 seconds
- Automatic WebSocket reconnection
- Fallback to mock data if connection fails

### Asset Information
- Current price
- Price changes (1h, 24h, 7d)
- Market cap
- 24h volume
- Circulating supply
- Maximum supply
- 7-day price chart

### User Interface
- Responsive table layout
- Sort by any column
- Search functionality
- Connection status indicator
- Last update timestamp

### Getting Started
- Clone the repository
- Install dependencies:
- npm install
- Start the development server:
- npm run dev


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
