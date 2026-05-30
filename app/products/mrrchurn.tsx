import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

type StripeMetricChartProps = {
  data: Array<{ [key: string]: any }>;
  isCurrency?: boolean;
  nameKey?: string; // Specify which field contains the X-axis labels (default: 'month' or 'name')
};

export const StripeMetricChart = ({
  data,
  isCurrency = true,
  nameKey,
}: StripeMetricChartProps) => {
  // Determine which key to use for X-axis labels
  const xAxisKey = nameKey || (data.length > 0 && 'month' in data[0] ? 'month' : 'name') || 'month';
  // Format numbers for tooltips and axes
  const formatValue = (value: any): string => {
    // Handle arrays (can occur in Recharts tooltips with multiple series)
    if (Array.isArray(value)) {
      return value.length > 0 ? formatValue(value[0]) : '0';
    }
    const num = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
    if (isCurrency) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    }
    return `${num}%`;
  };

  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
          
          <XAxis 
            dataKey={xAxisKey}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
          />
          
          <YAxis 
            tickFormatter={formatValue}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          
          <Tooltip 
            formatter={(value) => [formatValue(value)]}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}
          />
          
          <Legend verticalAlign="top" height={36} iconType="circle" />
          
          {/* Zero baseline for variance and negative churn tracking */}
          <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={1} />

          {/* Forecast shown as a subtle, soft area background */}
          <Area 
            name="Forecast"
            type="monotone" 
            dataKey="forecast" 
            fill="#f1f5f9" 
            stroke="#cbd5e1" 
            strokeDasharray="4 4"
          />

          {/* Variance displayed as bars (positive/negative) */}
          <Bar 
            name="Variance"
            dataKey="variance" 
            barSize={20} 
            fill="#38bdf8" 
          />

          {/* Actuals shown as a bold, primary line */}
          <Line 
            name="Actual"
            type="monotone" 
            dataKey="actual" 
            stroke="#6366f1" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />

          {/* Target shown as a crisp, dashed target line */}
          <Line 
            name="Target"
            type="monotone" 
            dataKey="target" 
            stroke="#ec4899" 
            strokeWidth={2} 
            strokeDasharray="5 5" 
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StripeMetricChart;