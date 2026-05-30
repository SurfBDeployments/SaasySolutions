
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const ExecutiveDashboard = () => {
  // Updated Sample Data with your specific margin ranges
  const financialData = [
    { month: 'Oct', revenue: 450000, grossMargin: 22.5, netProfit: 45000 },
    { month: 'Nov', revenue: 480000, grossMargin: 28.0, netProfit: 52000 },
    { month: 'Dec', revenue: 600000, grossMargin: 34.5, netProfit: 85000 },
    { month: 'Jan', revenue: 420000, grossMargin: 38.0, netProfit: 72000 },
    { month: 'Feb', revenue: 440000, grossMargin: 42.5, netProfit: 88000 },
    { month: 'Mar', revenue: 510000, grossMargin: 44.2, netProfit: 105000 },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '24px', color: '#2c3e50' }}>Executive Performance Trends</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Revenue & Profit Line Chart */}
        <div style={chartCardStyle}>
          <h4 style={titleStyle}>Revenue vs Net Profit ($)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" />
              <Line type="monotone" dataKey="revenue" stroke="#3498db" strokeWidth={4} dot={{ r: 6 }} name="Revenue" />
              <Line type="monotone" dataKey="netProfit" stroke="#17b85a" strokeWidth={4} dot={{ r: 6 }} name="Net Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gross Margin Bar Chart - Showing the 20% to 45% shift */}
        <div style={chartCardStyle}>
          <h4 style={titleStyle}>Gross Profit Margin (%)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              {/* Domain set to 0-50 to make the 20% to 45% growth very visible */}
              <YAxis domain={[0, 50]} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="grossMargin" radius={[4, 4, 0, 0]} name="Margin %">
                {financialData.map((entry, index) => (
                  // Color coding: Blue for lower margin (Oct-Dec), Green for higher (Jan-Mar)
                  <Cell key={`cell-${index}`} fill={entry.grossMargin > 35 ? '#2ecc71' : '#3498db'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '10px' }}>
            * Significant margin expansion observed from Q4 (20-35%) to Q1 (35-45%).
          </p>
        </div>

      </div>
    </div>
  );
};

const chartCardStyle = { 
  backgroundColor: '#fff', 
  padding: '24px', 
  borderRadius: '12px', 
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
};

const titleStyle = { margin: '0 0 20px 0', color: '#34495e', fontWeight: '600' };

export default ExecutiveDashboard;
