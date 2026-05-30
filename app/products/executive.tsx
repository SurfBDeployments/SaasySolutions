
import React from 'react';
import { 
  ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';

const data = [
  { month: "Jan", actual: 45000, target: 40000, forecast: 42000, ytd_actual: 45000, variance: 5000 },
  { month: "Feb", actual: 52000, target: 40000, forecast: 48000, ytd_actual: 97000, variance: 12000 },
  { month: "Mar", actual: 38000, target: 45000, forecast: 40000, ytd_actual: 135000, variance: -7000 },
  { month: "Apr", actual: 41000, target: 45000, forecast: 43000, ytd_actual: 176000, variance: -4000 }
];
const mrrData = [
  { 
    month: "Jan", 
    actual: 38000, 
    target: 35000, 
    forecast: 37000, 
    ytd_actual: 38000, 
    variance: 3000 
  },
  { 
    month: "Feb", 
    actual: 41000, 
    target: 40000, 
    forecast: 40500, 
    ytd_actual: 79000, 
    variance: 1000 
  },
  { 
    month: "Mar", 
    actual: 43200, 
    target: 45000, 
    forecast: 44000, 
    ytd_actual: 122200, 
    variance: -1800 
  },
  { 
    month: "Apr", 
    actual: 45000, 
    target: 45000, 
    forecast: 46000, 
    ytd_actual: 167200, 
    variance: 0 
  },
  { 
    month: "May", 
    actual: 48500, 
    target: 48000, 
    forecast: 47500, 
    ytd_actual: 215700, 
    variance: 500 
  }
];

const ExecutiveExpensesChart = () => {
  return (
    <div style={{ width: '100%', height: 400, background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          {/* Primary Y-Axis for Monthly Expenses */}
          <YAxis yAxisId="left" label={{ value: 'Expenses ($)', angle: -90, position: 'insideLeft' }} />
          {/* Secondary Y-Axis for Cumulative YTD */}
          <YAxis yAxisId="right" orientation="right" label={{ value: 'YTD ($)', angle: 90, position: 'insideRight' }} />
          
          <Tooltip cursor={{ fill: '#eee' }} />
          <Legend verticalAlign="top" height={36}/>

          {/* Actual vs Target: Bars and Reference Lines */}
          <Bar yAxisId="left" dataKey="actual" name="Actual Spend" fill="#2563eb" barSize={40} />
          <Line yAxisId="left" type="step" dataKey="target" name="Budget Target" stroke="#dc2626" strokeWidth={2} dot={false} />
          
          {/* Forecast: Dashed Line */}
          <Line yAxisId="left" type="monotone" dataKey="forecast" name="Forecast" stroke="#9333ea" strokeDasharray="5 5" />
          
          {/* YTD Progress: Area on secondary axis */}
          <Area yAxisId="right" type="monotone" dataKey="ytd_actual" name="YTD Total" fill="#cbd5e1" stroke="#64748b" opacity={0.3} />
          
          {/* Variance Zero Baseline */}
          <ReferenceLine yAxisId="left" y={0} stroke="#000" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExecutiveExpensesChart;
