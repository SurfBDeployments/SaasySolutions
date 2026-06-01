import { useState } from 'react';



  // Customer Retention Rate Data (%)
const customerRetentionData = [
  { month: "Jan", actual: 97.2, target: 96.5, forecast: 96.8, ytd_actual: 97.2, variance: 0.7 },
  { month: "Feb", actual: 97.4, target: 96.5, forecast: 97.0, ytd_actual: 97.3, variance: 0.9 },
  { month: "Mar", actual: 94.5, target: 97.0, forecast: 97.2, ytd_actual: 96.4, variance: -2.5 },
  { month: "Apr", actual: 98.1, target: 97.0, forecast: 96.0, ytd_actual: 96.8, variance: 1.1 },
  { month: "May", actual: 97.8, target: 97.5, forecast: 97.5, ytd_actual: 97.0, variance: 0.3 }
];

// Trial-to-Paid Conversion Rate Data (%)
const conversionRateData = [
  { month: "Jan", actual: 4.2, target: 4.0, forecast: 3.8, ytd_actual: 4.2, variance: 0.2 },
  { month: "Feb", actual: 4.8, target: 4.0, forecast: 4.3, ytd_actual: 4.5, variance: 0.8 },
  { month: "Mar", actual: 3.5, target: 4.5, forecast: 4.6, ytd_actual: 4.2, variance: -1.0 },
  { month: "Apr", actual: 3.9, target: 4.5, forecast: 4.0, ytd_actual: 4.1, variance: -0.6 },
  { month: "May", actual: 5.1, target: 4.8, forecast: 4.4, ytd_actual: 4.3, variance: 0.3 }
];


  // Stripe Gross Volume Data
const grossVolumeData = [
  { month: "Jan", actual: 52000, target: 50000, forecast: 48000, ytd_actual: 52000, variance: 2000 },
  { month: "Feb", actual: 58000, target: 52000, forecast: 54000, ytd_actual: 110000, variance: 6000 },
  { month: "Mar", actual: 49000, target: 55000, forecast: 56000, ytd_actual: 159000, variance: -6000 },
  { month: "Apr", actual: 55000, target: 58000, forecast: 56000, ytd_actual: 214000, variance: -3000 },
  { month: "May", actual: 64000, target: 60000, forecast: 61000, ytd_actual: 278000, variance: 4000 }
];

// Stripe Net Volume Data (Gross minus refunds, disputes, and Stripe processing fees)
const netVolumeData = [
  { month: "Jan", actual: 49400, target: 47500, forecast: 45600, ytd_actual: 49400, variance: 1900 },
  { month: "Feb", actual: 55100, target: 49400, forecast: 51300, ytd_actual: 104500, variance: 5700 },
  { month: "Mar", actual: 46100, target: 52200, forecast: 53200, ytd_actual: 150600, variance: -6100 },
  { month: "Apr", actual: 52250, target: 55100, forecast: 53200, ytd_actual: 202850, variance: -2850 },
  { month: "May", actual: 60800, target: 57000, forecast: 57950, ytd_actual: 263650, variance: 3800 }
];

// SaaS Cash Flow Data (Stripe payouts landed in bank minus operational expenses)
const cashFlowData = [
  { month: "Jan", actual: 12000, target: 10000, forecast: 9500, ytd_actual: 12000, variance: 2000 },
  { month: "Feb", actual: 15500, target: 11000, forecast: 13000, ytd_actual: 27500, variance: 4500 },
  { month: "Mar", actual: 6000, target: 12000, forecast: 11500, ytd_actual: 33500, variance: -6000 },
  { month: "Apr", actual: 9500, target: 14000, forecast: 11000, ytd_actual: 43000, variance: -4500 },
  { month: "May", actual: 19000, target: 15000, forecast: 16000, ytd_actual: 62000, variance: 4000 }
];


  const financialData = [
    { month: 'Oct', revenue: 450000, grossMargin: 22.5, netProfit: 45000, ebit: 95000, debtToEquity: 1.85 },
    { month: 'Nov', revenue: 480000, grossMargin: 28.0, netProfit: 52000, ebit: 102000, debtToEquity: 1.70 },
    { month: 'Dec', revenue: 600000, grossMargin: 34.5, netProfit: 85000, ebit: 145000, debtToEquity: 1.45 },
    { month: 'Jan', revenue: 420000, grossMargin: 38.0, netProfit: 72000, ebit: 88000, debtToEquity: 1.30 },
    { month: 'Feb', revenue: 440000, grossMargin: 42.5, netProfit: 88000, ebit: 92000, debtToEquity: 1.25 },
    { month: 'Mar', revenue: 510000, grossMargin: 44.2, netProfit: 105000, ebit: 115000, debtToEquity: 1.15 },
  ];

  const variancedata = [
      { month: "Oct", actual: 45000, target: 40000, forecast: 41000, ytd_actual: 77000, variance: 5000 },
    { month: "Nov", actual: 52000, target: 40000, forecast: 48000, ytd_actual: 97000, variance: 12000 },
      { month: "Dec", actual: 50000, target: 42000, forecast: 48000, ytd_actual: 101000, variance: 8000 },
    { month: "Jan", actual: 45000, target: 40000, forecast: 42000, ytd_actual: 45000, variance: 5000 },
    { month: "Feb", actual: 52000, target: 40000, forecast: 48000, ytd_actual: 97000, variance: 12000 },
    { month: "Mar", actual: 38000, target: 45000, forecast: 40000, ytd_actual: 135000, variance: -7000 },
    { month: "Apr", actual: 41000, target: 45000, forecast: 43000, ytd_actual: 176000, variance: -4000 },
  ];
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
  export { financialData, variancedata, churnData, mrrData, customerRetentionData, conversionRateData, grossVolumeData, netVolumeData, cashFlowData };  