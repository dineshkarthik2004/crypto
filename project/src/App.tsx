import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import CryptoTracker from './components/CryptoTracker';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
        <CryptoTracker />
      </div>
    </Provider>
  );
}

export default App;