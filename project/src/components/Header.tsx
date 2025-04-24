import React from 'react';
import { Activity, Search } from 'lucide-react';
import { useAppDispatch } from '../app/hooks';
import { setSearchTerm } from '../features/crypto/cryptoSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex items-center">
        <div className="bg-indigo-600 p-2 rounded-lg mr-3">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Crypto Tracker</h1>
          <p className="text-slate-400 text-sm">Live cryptocurrency prices and market data</p>
        </div>
      </div>
      
      <div className="relative md:w-64">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input 
          type="search" 
          className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-500"
          placeholder="Search assets..." 
          onChange={handleSearch}
        />
      </div>
    </header>
  );
};

export default Header;