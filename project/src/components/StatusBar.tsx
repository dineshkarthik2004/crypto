import React from 'react';
import { CircleDot, Info } from 'lucide-react';

interface StatusBarProps {
  lastUpdate: number | null;
  isConnected: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ lastUpdate, isConnected }) => {
  return (
    <div className="flex justify-between items-center mt-4 text-xs text-slate-400 py-3 px-4 bg-slate-800/50 rounded-lg">
      <div className="flex items-center">
        <CircleDot className={`h-3 w-3 mr-2 ${isConnected ? 'text-green-500 animate-pulse' : 'text-red-500'}`} />
        <span>{isConnected ? 'Live updates' : 'Connecting...'}</span>
        {lastUpdate && (
          <span className="ml-2">
            · Last updated: {new Date(lastUpdate).toLocaleTimeString()}
          </span>
        )}
      </div>
      
      <div className="flex items-center">
        <Info className="h-3 w-3 mr-1" />
        <span>Data updates every 1.5 seconds</span>
      </div>
    </div>
  );
};

export default StatusBar;