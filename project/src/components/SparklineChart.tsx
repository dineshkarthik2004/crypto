import React, { useMemo } from 'react';
import { getPercentageColorClass } from '../utils/formatters';

interface SparklineChartProps {
  data: number[];
  height?: number;
  width?: number;
  lineColor?: string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ 
  data, 
  height = 40, 
  width = 120,
  lineColor
}) => {
  const normalizedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    // Avoid division by zero
    if (range === 0) return data.map(() => height / 2);
    
    // Normalize data to fit within the height
    return data.map(value => {
      const normalized = ((value - min) / range) * height;
      // Invert Y-axis since SVG coordinates start from top-left
      return height - normalized;
    });
  }, [data, height]);

  // Calculate trend direction
  const trendDirection = useMemo(() => {
    if (data.length < 2) return 0;
    return data[data.length - 1] > data[0] ? 1 : data[data.length - 1] < data[0] ? -1 : 0;
  }, [data]);

  // Dynamic line color based on trend
  const chartLineColor = lineColor || (
    trendDirection > 0 ? '#22c55e' : trendDirection < 0 ? '#ef4444' : '#9ca3af'
  );

  if (!data || data.length === 0) {
    return <div style={{ width, height }} className="bg-gray-100 rounded opacity-30" />;
  }

  // Create path data
  const pathData = normalizedData.map((point, index) => {
    const x = (index / (data.length - 1)) * width;
    return `${index === 0 ? 'M' : 'L'} ${x},${point}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={pathData}
        fill="none"
        stroke={chartLineColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        className="transition-all duration-300"
      />
    </svg>
  );
};

export default SparklineChart;