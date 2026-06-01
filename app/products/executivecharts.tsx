import { useState } from 'react';
import {
  Area, ComposedChart, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import styles from './executivecharts.module.css';
import StripeMetricChart from './mrrchurn';
import { customerRetentionData, grossVolumeData, netVolumeData, cashFlowData, financialData, variancedata, churnData, mrrData } from './chartdatasets';


const MasterDashboard = () => {
  const [activeTab, setActiveTab] = useState('financials');


  // use a loose prop type to match Recharts' optional payload and avoid type errors
  const renderGrossMarginBar = (barProps: any) => {
    const { x, y, width, height, payload } = barProps || {};
    const gross = payload?.grossMargin ?? 0;
    const fill = gross > 35 ? '#2ecc71' : '#3498db';
    return <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} ry={4} />;
  };

  let pageTitle = 'Dashboard';
  if (activeTab === 'financials') pageTitle = 'Core Financials';
  else if (activeTab === 'solvency') pageTitle = 'Solvency & EBIT';
  else if (activeTab === 'variancedata') pageTitle = 'Budget Variance';
  else if (activeTab === 'mrrData') pageTitle = 'MRR & Churn';

  return (
    <div className={styles.container}>

      {/* SIDE NAVIGATION */}
      <nav className={styles.sidebar}>
        <h5 className={styles.sidebarTitle}>Welcome Brian</h5>
        <h2 className={styles.sidebarHeading}>Executive View</h2>
        <div
          onClick={() => setActiveTab('financials')}
          className={activeTab === 'financials' ? styles.navLinkActive : styles.navLink}
        >
          Core Financials
        </div>
        <div
          onClick={() => setActiveTab('solvency')}
          className={activeTab === 'solvency' ? styles.navLinkActive : styles.navLink}
        >
          Solvency & EBIT
        </div>
        <div
          onClick={() => setActiveTab('variancedata')}
          className={activeTab === 'variancedata' ? styles.navLinkActive : styles.navLink}
        >
          Budget Variance
        </div>
        <div
          onClick={() => setActiveTab('mrrData')}
          className={activeTab === 'mrrData' ? styles.navLinkActive : styles.navLink}
        >
          MRR & Churn
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.heading}>{pageTitle}</h1>
          <p className={styles.subheading}>Real-time Executive Reporting Dashboard</p>
        </header>

        {activeTab === 'financials' ? (
          <div className={styles.grid}>
            {/* Revenue Chart */}
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Revenue vs Net Profit ($)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3498db" strokeWidth={4} />
                  <Line type="monotone" dataKey="netProfit" stroke="#2ecc71" strokeWidth={4} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Margin Chart */}
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Gross Profit Margin (%)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Bar dataKey="grossMargin" radius={[4, 4, 0, 0]} shape={renderGrossMarginBar} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        ) : activeTab === 'solvency' ? (
          <div className={styles.grid}>
            {/* EBIT Chart */}
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>EBIT (Operating Income)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ebit" fill="#8e44ad" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Debt/Equity Chart */}
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Debt to Equity Ratio</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 2]} />
                  <Tooltip />
                  <ReferenceLine y={1.5} label="Max Target" stroke="red" strokeDasharray="3 3" />
                  <Line type="stepAfter" dataKey="debtToEquity" stroke="#e74c3c" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        ) : activeTab === 'variancedata' ? (
          // Budget Variance tab — matches same two-column grid layout as Core Financials
          <div className={styles.grid}>
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Budget Variance</h4>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={variancedata} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" label={{ value: 'Expenses ($)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'YTD ($)', angle: 90, position: 'insideRight' }} />
                  <Tooltip cursor={{ fill: '#eee' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar yAxisId="left" dataKey="actual" name="Actual Spend" fill="#2563eb" barSize={40} />
                  <Line yAxisId="left" type="step" dataKey="target" name="Budget Target" stroke="#dc2626" strokeWidth={2} dot={false} />
                  <Line yAxisId="left" type="monotone" dataKey="forecast" name="Forecast" stroke="#9333ea" strokeDasharray="5 5" />
                  <Area yAxisId="right" type="monotone" dataKey="ytd_actual" name="YTD Total" fill="#cbd5e1" stroke="#64748b" opacity={0.3} />
                  <ReferenceLine yAxisId="left" y={0} stroke="#000" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Monthly Variance</h4>
              <StripeMetricChart data={variancedata.map(item => ({ name: item.month, value: item.variance }))} isCurrency={true} />
            </div>

          </div>
        ) : activeTab === 'mrrData' ? (

          <div className={styles.grid}>
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Monthly Recurring Revenue (MRR)</h4>
              <StripeMetricChart data={mrrData} isCurrency={true} />


            </div>

            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Net Revenue Churn Rate</h4>
              <StripeMetricChart data={churnData} isCurrency={true} />
            </div>


            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Gross Volume</h4>

              <StripeMetricChart data={grossVolumeData} isCurrency={true} />
            </div>
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Net Volume</h4>
              <StripeMetricChart data={netVolumeData} isCurrency={true} />
            </div>
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Cash Flow</h4>
              <StripeMetricChart data={cashFlowData} isCurrency={true} />

            </div>

            {/*Renders rate percentage format (97.2%) with a rolling average YTD */}
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Customer Retention Rate</h4>
              <StripeMetricChart data={customerRetentionData} isCurrency={false} />

            </div>


          </div>


        ) : null
        } </main>
    </div>
  );
};


export default MasterDashboard;
