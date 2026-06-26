"use client";

import { useEffect, useRef, useState } from "react";
import ResponsiveAppBar from "./components/appbar";
import Footer from "./components/footer";
import "../styles/default.css";
import { variancedata, churnData } from './products/chartdatasets';
import {
  Area, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import styles from './products/executivecharts.module.css';
import StripeMetricChart from './products/mrrchurn';
import Link from 'next/link';

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
      <h3 className="ss-feature-title">{title}</h3>
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
      <style>{`
        /* ── Google Fonts ─────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        /* ── Tokens ───────────────────────────────────────────────── */
        :root {
          --ss-ink:        #0b0f1a;
          --ss-surface:    #f5f4f0;
          --ss-white:      #ffffff;
          --ss-accent:     #1a6b45;      /* deep forest green */
          --ss-accent-lt:  #3DD696;      /* bright mint green */
          --ss-accent-pale:#d6f0e6;
          --ss-muted:      #6b7280;
          --ss-border:     #e2e0d8;
          --ss-hero-bg:    #1a2e22;      /* very dark green */
          --ff-display:    'Roboto', sans-serif;
          --ff-body:       'Geist', sans-serif;
        }

        /* ── Reset / base ─────────────────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--ss-surface); color: var(--ss-ink); font-family: var(--ff-body); }

        /* ── Hero ─────────────────────────────────────────────────── */
        .ss-hero {
          position: relative;
          min-height: 92vh;
          background: var(--ss-hero-bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 6rem 1.5rem 5rem;
        }

        /* animated mesh background */
         .ss-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(34,160,107,.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(26,107,69,.18) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 10%, rgba(255,255,255,.04) 0%, transparent 50%);
          animation: meshShift 12s ease-in-out infinite alternate;
        } 
        @keyframes meshShift {
          0%   { transform: scale(1)   rotate(0deg); }
          100% { transform: scale(1.08) rotate(2deg); }
        }

        /* subtle grid overlay */
        .ss-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .ss-hero-inner {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1200px;
        }

        .ss-badge {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          background: rgba(34,160,107,.15);
          border: 1px solid rgba(34, 160, 107, 0.76);
          color: var(--ss-accent-lt);
          font-family: var(--ff-body);
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: .35rem .9rem;
          border-radius: 999px;
          margin-bottom: 2rem;
          animation: fadeSlideDown .7s ease both;
        }
        .ss-badge-dot {
          width: 6px; height: 6px;
          background: var(--ss-accent-lt);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .5; transform: scale(.7); }
        }

        .ss-hero-title {
          font-family: var(--ff-display);
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 700;
          line-height: .95;
          
          color: var(--ss-white);
          animation: fadeSlideDown .7s .1s ease both;
        }
        .ss-hero-title .ss-accent-word {
          color: var(--ss-accent-lt);
          display: inline-block;
          position: relative;
        }
        /* underline swoosh */
        .ss-accent-word::after {
          content: '';
          position: absolute;
          left: 0; bottom: -4px;
          width: 100%; height: 3px;
          background: linear-gradient(90deg, var(--ss-accent-lt), transparent);
          border-radius: 2px;
        }

        .ss-hero-tagline {
          margin-top: 1.75rem;
          font-size: clamp(1.05rem, 2.5vw, 1.35rem);
          font-weight: 300;
          color: var(--ss-muted);
          line-height: 1.65;
          max-width: 640px;
          margin-inline: auto;
          animation: fadeSlideDown .7s .2s ease both;
          border-radius: 10px;
    padding: 20px;
        }

        .ss-hero-cta {
          margin-top: 2.75rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          animation: fadeSlideDown .7s .35s ease both;
        }

        .ss-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: var(--ss-accent-lt);
          color: var(--ss-white);
          font-family: var(--ff-body);
          font-size: .95rem;
          font-weight: 500;
          padding: .85rem 2rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 0 0 0 rgba(34,160,107,0);
        }
        .ss-btn-primary:hover {
          background: #1d9660;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(34,160,107,.35);
        }

        .ss-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: transparent;
          color: rgba(255,255,255,.75);
          font-family: var(--ff-body);
          font-size: .95rem;
          font-weight: 400;
          padding: .85rem 1.75rem;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,.2);
          cursor: pointer;
          transition: border-color .2s, color .2s;
        }
        .ss-btn-ghost:hover { border-color: rgba(255,255,255,.5); color: #fff; }

        /* image placeholder */
        .ss-hero-image {
          position: relative;
          margin-top: 4.5rem;
          width: 100%;
          max-width: 900px;
          margin-inline: auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,.5);
          animation: fadeSlideUp .8s .5s ease both;
          border: 1px solid rgba(255,255,255,.08);
        }
        .ss-hero-image-inner {
          width: 100%;
          aspect-ratio: 16/9;
          background:
            linear-gradient(135deg, #0f2419 0%, #163325 40%, #0d1f16 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .ss-placeholder-icon {
          font-size: 3rem;
          opacity: .35;
        }
        .ss-placeholder-text {
          color: rgba(255,255,255,.25);
          font-size: .85rem;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        /* mock UI lines inside placeholder */
        .ss-mock-lines {
          position: absolute;
          inset: 0;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: .6rem;
          opacity: .12;
          pointer-events: none;
        }
        .ss-mock-line {
          height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,.7);
        }
        .ss-mock-line.short { width: 40%; }
        .ss-mock-line.medium { width: 65%; }
        .ss-mock-line.full { width: 90%; }

        /* ── Animations ───────────────────────────────────────────── */
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Stats band ───────────────────────────────────────────── */
        .ss-stats {
          background: var(--ss-white);
          border-bottom: 1px solid var(--ss-border);
          padding: 3rem 1.5rem;
        }
        .ss-stats-inner {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
        }
        .ss-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .35rem;
          animation: fadeSlideUp .6s ease both;
        }
        .ss-stat-number {
          font-family: var(--ff-display);
          font-size: 3rem;
          font-weight: 800;
          color: var(--ss-accent);
          line-height: 1;
          letter-spacing: -.03em;
        }
        .ss-stat-label {
          font-size: .85rem;
          font-weight: 400;
          color: var(--ss-muted);
          text-align: center;
          letter-spacing: .04em;
        }

        /* ── Section shared ───────────────────────────────────────── */
        .ss-section {
          padding: 5.5rem 1.5rem;
        }
        .ss-section-inner {
          max-width: 1080px;
          margin: 0 auto;
        }
        .ss-eyebrow {
          display: inline-block;
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--ss-accent-lt);
          margin-bottom: .9rem;
        }
        .ss-section-title {
          font-family: var(--ff-display);
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -.025em;
          color: var(--ss-ink);
          max-width: 580px;
        }
       .ss-section-sub {
    margin-top: 1rem;
    font-size: 1.05rem;
    font-weight: 300;
    color: var(--ss-muted);
    max-width: 520px;
    line-height: 1.7;
    border-radius: 10px;
    padding: 20px;
}

        /* ── Features ─────────────────────────────────────────────── */
        .ss-features-section {
          background: var(--ss-surface);
        }
        .ss-features-grid {
          margin-top: 3.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .ss-feature-card {
          background: var(--ss-white);
          border: 1px solid var(--ss-border);
          border-radius: 10px;
          padding: 2rem 1.75rem;
          transition: transform .2s, box-shadow .2s, border-color .2s;
          animation: fadeSlideUp .6s ease both;
        }
        .ss-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,.07);
          border-color: var(--ss-accent-pale);
        }
        .ss-feature-icon {
          font-size: 2rem;
          margin-bottom: 1.1rem;
          line-height: 1;
        }
        .ss-feature-title {
          font-family: var(--ff-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--ss-ink);
          margin-bottom: .6rem;
          letter-spacing: -.01em;
        }
        .ss-feature-desc {
          font-size: .9rem;
          font-weight: 300;
          color: var(--ss-muted);
          line-height: 1.65;
        }

        /* ── About strip ──────────────────────────────────────────── */
        .ss-about-section {
          background: var(--ss-white);
        }
        .ss-about-layout {
          margin-top: 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 700px) {
          .ss-about-layout { grid-template-columns: 1fr; gap: 2rem; }
        }
        .ss-about-body {
          font-size: 1rem;
          font-weight: 300;
          color: var(--ss-muted);
          line-height: 1.8;
        }
        .ss-about-body p + p { margin-top: 1rem; }
        .ss-about-visual {
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, var(--ss-accent-pale) 0%, #c4e8d8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .ss-about-visual-text {
          font-family: var(--ff-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--ss-accent);
          opacity: .4;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        /* decorative circles */
        .ss-about-visual::before,
        .ss-about-visual::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(26,107,69,.2);
        }
        .ss-about-visual::before {
          width: 60%; height: 60%;
          top: -15%; left: -15%;
        }
        .ss-about-visual::after {
          width: 80%; height: 80%;
          bottom: -20%; right: -20%;
        }

        /* ── CTA banner ───────────────────────────────────────────── */
        .ss-cta-section {
          background: var(--ss-accent);
          padding: 5rem 1.5rem;
        }
        .ss-cta-inner {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        .ss-cta-title {
          font-family: var(--ff-display);
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.05;
          letter-spacing: -.03em;
          margin-bottom: 1.25rem;
        }
        .ss-cta-sub {
          font-size: 1.05rem;
          font-weight: 300;
          color: #ffffff;
          background: #1a6b45;
          line-height: 1.65;
          margin-bottom: 2.25rem;
        }
        .ss-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: var(--ss-white);
          color: var(--ss-accent);
          font-family: var(--ff-body);
          font-size: 1rem;
          font-weight: 500;
          padding: .9rem 2.25rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background .2s, transform .2s;
          box-shadow: 0 4px 20px rgba(0,0,0,.15);
        }
        .ss-cta-btn:hover {
          background: #f0fdf7;
          transform: translateY(-2px);
        }

        /* ── Divider ──────────────────────────────────────────────── */
        .ss-divider {
          width: 48px;
          height: 3px;
          background: var(--ss-accent-lt);
          border-radius: 2px;
          margin: 1.25rem 0 0;
        }
      `}</style>

      <ResponsiveAppBar />

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

          <p className="ss-hero-tagline">
            SaaSy Solutions bridges marketing execution and sales conversion—
            turning data-driven strategy into measurable market share for B2B software organizations.
          </p>

          <div className="ss-hero-cta">
            <Link href="/about">
              <button className="ss-btn-primary">
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
              <h4 className={styles.cardTitle}>Net Revenue Churn Rate</h4>
              <StripeMetricChart data={churnData} isCurrency={true} />
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
          <h2 className="ss-section-title">
            The Full Growth Stack for B2B Software
          </h2>
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
          <h2 className="ss-cta-title">
            Ready to Build Predictable Revenue?
          </h2>
          <p className="ss-cta-sub">
            Partner with SaaSy Solutions and turn your pipeline into a reliable growth engine.
            No guesswork—just repeatable results.
          </p> <Link href="/about">
            <button className="ss-cta-btn" >
              Schedule a Strategy Call →
            </button></Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
