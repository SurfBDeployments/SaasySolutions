

import {StripeMetricChart } from './mrrchurn';


const churnData = [
  { 
    month: "Jan", 
    actual: -0.8, 
    target: -0.5, 
    forecast: -0.6, 
    ytd_actual: -0.8, 
    variance: -0.3 
  },
  { 
    month: "Feb", 
    actual: -1.1, 
    target: -0.5, 
    forecast: -0.9, 
    ytd_actual: -1.9, 
    variance: -0.6 
  },
  { 
    month: "Mar", 
    actual: 0.5, 
    target: -0.5, 
    forecast: -1.0, 
    ytd_actual: -1.4, 
    variance: 1.0 
  },
  { 
    month: "Apr", 
    actual: -1.4, 
    target: -0.5, 
    forecast: -1.2, 
    ytd_actual: -2.8, 
    variance: -0.9 
  },
  { 
    month: "May", 
    actual: -1.2, 
    target: -0.5, 
    forecast: -1.5, 
    ytd_actual: -4.0, 
    variance: -0.7 
  }
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



function Dashboard() {
  return (
    <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr', padding: '24px' }}>
      <div>
        <h3>Monthly Recurring Revenue (MRR)</h3>
        <StripeMetricChart data={mrrData} isCurrency={true} />
      </div>
      
      <div>
        <h3>Net Revenue Churn Rate</h3>
        <StripeMetricChart data={churnData} isCurrency={false} />
      </div>
    </div>
  );
}
