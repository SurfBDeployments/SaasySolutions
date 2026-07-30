"use client";

import { useEffect, useRef, useState } from "react";
import ResponsiveAppBar from "./components/appbar";
import Footer from "./components/footer";
import "../styles/default.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import StripeMetricChart from "./products/mrrchurn";
import { grossVolumeData, financialData } from './products/chartdatasets';
import Link from 'next/link';
import styles from '../styles/executivecharts.module.css';



// ─── Stat counter hook ───────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  label,
  delay,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  const count = useCountUp(value, 1800, inView);
  return (
    <div
      className="ss-stat-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="ss-stat-number">
        {count}
        {suffix}
      </span>
      <span className="ss-stat-label">{label}</span>
    </div>
  );
}

// ─── Feature card ────────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <div className="ss-feature-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="ss-feature-icon">{icon}</div>
      <h1 className="ss-feature-title">{title}</h1>
      <p className="ss-feature-desc">{description}</p>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>

    
        <ResponsiveAppBar />


      <main>
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="ss-hero">
          <div className="ss-hero-inner">
            <div className="ss-badge">
              <span className="ss-badge-dot" />
              Premier B2B Sales &amp; Marketing Partner
            </div>

            <h1 className="ss-hero-title">
              Scale Smarter.<br />
              Grow <span className="ss-accent-word">Predictably</span>
            </h1>

            <h2 className="ss-hero-tagline">
              SaaSy Solutions bridges marketing execution and sales conversion—
              turning data-driven strategy into measurable market share for B2B software organizations.
            </h2>

            <div className="ss-hero-cta">
              <Link href="/about">
                <button className="ss-cta-btn">
                  Get Started →
                </button>
              </Link>
              <Link href="/about">
                <button className="ss-btn-ghost">
                  Learn How It Works
                </button></Link>
            </div>

            {/* Hero image placeholder */}

            <div className={styles.grid} style={{ marginTop: '40px' }}>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Gross Volume</p>

                <StripeMetricChart data={grossVolumeData} isCurrency={true} />
              </div>


              {/* Revenue Chart */}
              <div className={styles.card}>
                <p className={styles.cardTitle}>Revenue vs Net Profit ($)</p>
                <ResponsiveContainer width="100%" height={400} style={{ padding: '20px' }}>
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
            </div>
            {/* <MediaGrid /> */}


          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────────────── */}
        <div className="ss-stats" ref={statsRef}>
          <div className="ss-stats-inner">
            <StatCard value={300} suffix="+" label="B2B Clients Scaled" delay={0} inView={statsInView} />
            <StatCard value={47} suffix="%" label="Avg. CAC Reduction" delay={100} inView={statsInView} />
            <StatCard value={3} suffix="×" label="Pipeline Velocity Lift" delay={200} inView={statsInView} />
            <StatCard value={98} suffix="%" label="Client Retention Rate" delay={300} inView={statsInView} />
          </div>
        </div>

        {/* ── FEATURES ──────────────────────────────────────────────── */}
        <section className="ss-section ss-features-section">
          <div className="ss-section-inner">
            <span className="ss-eyebrow">What We Do</span>
            <h3 className="ss-section-title">
              The Full Growth Stack for B2B Software
            </h3>
            <div className="ss-divider" />
            <p className="ss-section-sub">
              We combine cutting-edge marketing automation with elite sales execution—
              aligned to your buyer personas—to compress your sales cycle.
            </p>

            <div className="ss-features-grid">
              <FeatureCard
                icon="🎯"
                title="Targeted Demand Generation"
                description="Precision campaigns built around your ideal customer profile—reaching decision-makers before they start their search."
                delay={0}
              />
              <FeatureCard
                icon="⚡"
                title="Marketing Automation"
                description="Full-funnel automation that nurtures every lead with the right message at the right stage, at scale."
                delay={80}
              />
              <FeatureCard
                icon="🤝"
                title="Elite Sales Execution"
                description="Embedded SDR and AE teams who carry quota and align your brand message with buyer pain points—every call."
                delay={160}
              />
              <FeatureCard
                icon="📈"
                title="Revenue Analytics"
                description="Real-time dashboards that connect marketing spend to closed-won revenue, so every dollar is accountable."
                delay={240}
              />
              <FeatureCard
                icon="🔗"
                title="CRM & Stack Integration"
                description="Seamless connectivity with Salesforce, HubSpot, and your existing tech stack—no rip-and-replace required."
                delay={320}
              />
              <FeatureCard
                icon="🔄"
                title="Repeatable Growth Playbooks"
                description="Documented, battle-tested processes your team inherits—turning one great quarter into predictable annual growth."
                delay={400}
              />
            </div>
          </div>
        </section>



        {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
        <section className="ss-cta-section">
          <div className="ss-cta-inner">
            <p className="ss-cta-title">
              Ready to Build Predictable Revenue?
            </p>
            <Link href="/about">
              <button className="ss-cta-btn" >
                Schedule a Strategy Call →
              </button></Link>
          </div>
        </section>
      </main>
     
        <Footer />
    
    </>
  );
}
