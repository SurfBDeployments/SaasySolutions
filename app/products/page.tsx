
"use client"
//import { useEffect } from 'react';
import '../../styles/default.css';
import ResponsiveAppBar from '../components/appbar';
import Footer from '../components/footer';
import MasterDashboard from './executivecharts';
import Link from 'next/link';

export default function Home() {



  return (
    <>
      <ResponsiveAppBar />

      <article>
        <div className="max-w-7xl mx-auto">
          <div className='maincontent'>
            <h1 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: "left" }}>Products</h1>
             <h2 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: "left" }}>Data Visualizations | <Link href="/news">News APIs</Link></h2>
            <h5 className="max-w-m text-3xl font-condensed-light leading-10 tracking-tight text-black dark:text-slate-800" style={{ textAlign: "left", marginBottom: '20px' }}>Showing data set visualizations for net profit margins, revenue for last 6 months, EBIT and Debt to Equity Ratios, MRR/Churn Data and GraphQL API</h5>

            <MasterDashboard />


          </div>
        </div>
      </article>
      <Footer />

    </>

  );
}