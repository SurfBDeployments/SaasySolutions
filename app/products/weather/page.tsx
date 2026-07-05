"use client";
import '../../../styles/default.css';
import ResponsiveAppBar from '../../components/appbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { useEffect, useState } from "react";


// Helper function to decode WMO Weather Codes
function getWeatherCondition(code: number): { text: string; emoji: string } {
  if (code === 0) return { text: "Clear Sky", emoji: "☀️" };
  if (code >= 1 && code <= 3) return { text: "Partly Cloudy", emoji: "⛅" };
  if (code === 45 || code === 48) return { text: "Foggy", emoji: "🌫️" };
  if (code >= 51 && code <= 55) return { text: "Drizzle", emoji: "🌧️" };
  if (code >= 61 && code <= 65) return { text: "Rain", emoji: "🌧️" };
  if (code >= 71 && code <= 77) return { text: "Snowfall", emoji: "❄️" };
  if (code >= 80 && code <= 82) return { text: "Rain Showers", emoji: "🌦️" };
  if (code >= 95 && code <= 99) return { text: "Thunderstorm", emoji: "⛈️" };
  return { text: "Unknown Conditions", emoji: "🌍" };
}


export default function WeatherProductsPage() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/weather")
      .then((res) => {
        if (!res.ok) throw new Error("Could not read weather API stream");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-12 text-center text-slate-500 font-medium animate-pulse">Syncing weather stations...</div>;
  if (error) return <div className="p-12 text-center text-red-500 font-semibold">Network Error: {error}</div>;
  if (!weather || !weather.current) return <div className="p-12 text-center text-amber-500 font-medium">Invalid weather data package.</div>;

  const currentCondition = getWeatherCondition(weather.current.weather_code);

  return (
    <><ResponsiveAppBar />

      <article>
        <div className="max-w-7xl mx-auto">
          <div className='maincontent'>
            <h1 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: "left" }}>Products</h1>
          
            <h2 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: "left" }}><Link href="/products">Data Visualizations</Link> | <Link href="/news">News APIs</Link> | Weather APIs</h2>
            <h3 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>Showing weather data  for Raleigh, NC using an API endpoint done in Python running on FastAPI framework.</h3>
            <p className="text-sm text-emerald-400 font-mono mt-1">📍 Station Active (UTC Offset: {weather.location?.utc_offset_seconds}s)</p>
          
          <div className="text-left sm:text-right text-xs text-slate-400 font-mono space-y-0.5">
            <p>Elev: {weather.location?.elevation?.toFixed(1)}m ASL</p>
            <p>Lat: {weather.location?.latitude?.toFixed(4)}°</p>
            <p>Lon: {weather.location?.longitude?.toFixed(4)}°</p>
          </div>


          {/* Hero Current Weather Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Main Temperature Card */}
            <section className="md:col-span-2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-7xl opacity-20 pointer-events-none select-none">
                {currentCondition.emoji}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Current Status</span>
                {/* FIX: Display temperature raw because API is already returning Fahrenheit */}
                <h2 className="text-5xl font-black tracking-tight text-white mt-2">
                  {weather.current.temperature_2m?.toFixed(1)}°F
                </h2>
                <p className="text-lg font-medium text-slate-300 mt-1 flex items-center gap-2">
                  <span>{currentCondition.emoji}</span> {currentCondition.text}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-slate-800 text-sm">
                <div>
                  <p className="text-slate-400 font-medium">💧 Humidity</p>
                  <p className="text-base font-bold text-white mt-0.5">{weather.current.relative_humidity_2m ?? "N/A"}%</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">☁️ Cloud Cover</p>
                  <p className="text-base font-bold text-white mt-0.5">{weather.current.cloud_cover ?? "N/A"}%</p>
                </div>
              </div>
            </section>

            {/* New Expanded Metric Card Block */}
            <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Atmospherics</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-4">Extended Sensors</h3>

                <div className="space-y-3.5 text-sm font-mono">
                  {/* FIX: Wind gusts mapped to weather.current.wind_gusts_10m and changed unit to mph */}
                  <div className="flex justify-between border-b border-slate-800/60 pb-2">
                    <span className="text-slate-400">💨 Wind Gusts </span>
                    <span className="text-white font-bold"> {weather.current.wind_gusts_10m?.toFixed(1) || "0.0"} mph</span>
                  </div>
                  {/* FIX: Corrected variable key to wind_direction_10m from weather.current */}
                  <div className="flex justify-between border-b border-slate-800/60 pb-2">
                    <span className="text-slate-400">🧭 Wind Dir. </span>
                    <span className="text-white font-bold">{weather.current.wind_direction_10m || "0"}°</span>
                  </div>
                  {/* FIX: Safety fallback for Visibility since it isn't tracked in your current API parameters */}
                  <div className="flex justify-between border-b border-slate-800/60 pb-2">
                    <span className="text-slate-400">👁️ Visibility </span>
                    <span className="text-white font-bold">
                      {weather.current.visibility ? (weather.current.visibility / 1000).toFixed(1) : "10.0"} km
                    </span>
                  </div>
                  {/* FIX: Pointed tracking to current.surface_pressure instead of an unassigned hourly metric */}
                  <div className="flex justify-between">
                    <span className="text-slate-400">📉 Pressure </span>
                    <span className="text-white font-bold">{weather.current.surface_pressure?.toFixed(0) || "0"} hPa</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center text-xs text-slate-500 font-mono mt-4">
                Station Time: {weather.current.time}
              </div>
            </section>

          </div>
</div>
        </div>
      </article>
      <Footer />
    </>
  );
}