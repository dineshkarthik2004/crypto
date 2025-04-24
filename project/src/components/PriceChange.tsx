import React from 'react';
import { getPercentageColorClass, formatPercentage } from '../utils/formatters';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface PriceChangeProps {
  value: number;
  animated?: boolean;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value, animated = false }) => {
  const colorClass = getPercentageColorClass(value);
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  return (
    <div className={`flex items-center ${colorClass} ${animated ? 'transition-all duration-300' : ''}`}>
      {!isNeutral && (
        isPositive ? 
          <ArrowUp className="w-3 h-3 mr-1" /> : 
          <ArrowDown className="w-3 h-3 mr-1" />
      )}
      <span>{formatPercentage(value)}</span>
    </div>
  );
};

export default PriceChange;