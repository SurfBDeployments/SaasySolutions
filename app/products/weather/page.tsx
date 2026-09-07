"use client";
import '../../../styles/default.css';
import ResponsiveAppBar from '../../components/appbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';


type ForecastPeriod = {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number | null;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
  probabilityOfPrecipitation?: {
    unitCode: string;
    value: number | null;
  };
};

type WeatherGovForecastResponse = {
  properties?: {
    periods?: ForecastPeriod[];
    generatedAt?: string;
    updated?: string;
  };
};

const WEATHER_POINT_URL = 'https://api.weather.gov/points/35.7721,-78.6386';

function formatDateLabel(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function WeatherProductsPage() {
  const [forecastData, setForecastData] = useState<WeatherGovForecastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;

    async function loadForecast() {
      try {
        const pointsResponse = await fetch(WEATHER_POINT_URL, {
          headers: { Accept: 'application/geo+json' },
        });

        if (!pointsResponse.ok) {
          throw new Error('Unable to load weather.gov point data');
        }

        const pointsData = await pointsResponse.json();
        const forecastUrl = pointsData?.properties?.forecast;

        if (!forecastUrl) {
          throw new Error('Forecast URL not returned by weather.gov');
        }

        const forecastResponse = await fetch(forecastUrl, {
          headers: { Accept: 'application/geo+json' },
        });

        if (!forecastResponse.ok) {
          throw new Error('Unable to load the local 7-day forecast');
        }

        const data = await forecastResponse.json();

        if (!ignore) {
          setForecastData(data);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Unknown weather error');
          setLoading(false);
        }
      }
    }

    loadForecast();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-medium animate-pulse">Loading the local weather.gov forecast…</div>;
  }

  if (error) {
    return <div className="p-12 text-center text-red-500 font-semibold">Network Error: {error}</div>;
  }

  const periods = forecastData?.properties?.periods ?? [];
  const current = periods[0];
  const weekForecast = periods.slice(0, 7);

  return (
    <>
      <ResponsiveAppBar />
      <article>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="maincontent">
            <h1 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: 'left' }}>
              Products
            </h1>

            <h2 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: 'left' }}>
              <Link href="/products">Data Visualizations</Link> | <Link href="/news">News APIs</Link> | Weather APIs
            </h2>
            <h3 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>
              Showing the local 7-day forecast for Raleigh, NC using the weather.gov forecast endpoint.
            </h3>

            <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Source: weather.gov</p>
              <p className="mt-1">Point: 35.7721, -78.6386</p>
              <p className="mt-1">Updated: {forecastData?.properties?.generatedAt ? new Date(forecastData.properties.generatedAt).toLocaleString() : '—'}</p>
            </div>

            {current ? (
             <section className="md:col-span-2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 p-8 rounded-md shadow-xl" style={{ padding: "15px", marginBottom: "20px", marginTop: "20px" }}>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-300">Current forecast</p>
                    <h2 className="mt-2 text-5xl font-white tracking-tight" style={{ color: 'white' }}>
                      {current.temperature ?? '—'}°{current.temperatureUnit}
                    </h2>
                    <p className="mt-2 text-lg text-slate-200">{current.name}</p>
                    <p className="mt-2 max-w-2xl text-slate-300">{current.shortForecast}</p>
                  </div>
                  <div className="rounded-2xl p-4 text-sm text-slate-200">
                    <p className="font-semibold">{formatDateLabel(current.startTime)}</p>
                    <p className="mt-1">Wind: {current.windSpeed} {current.windDirection}</p>
                    <p className="mt-1">
                      Chance of precipitation: {current.probabilityOfPrecipitation?.value ?? 0}%
                    </p>
                  </div>
                </div>
              </section>
            ) : null}

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {weekForecast.map((period) => (
                <article key={period.number} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" style={{ padding: "10px" }}>
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{period.name}</p>
                      <p className="text-xs text-slate-500">{formatDateLabel(period.startTime)}</p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      {period.temperature ?? '—'}°{period.temperatureUnit}
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-700">{period.shortForecast}</p>
                  <p className="mt-3 text-sm text-slate-500">{period.detailedForecast}</p>

                  <div className="mt-4 space-y-1 text-sm text-slate-600">
                    <p>Wind: {period.windSpeed} {period.windDirection}</p>
                    <p>Precipitation: {period.probabilityOfPrecipitation?.value ?? 0}%</p>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}