"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export default function RadarMap() {
  const center: LatLngExpression = [35.7721, -78.6386]; // Raleigh

  // NOAA radar frames (6-frame loop)
  const radarFrames = ["n0r", "n0q", "n0r", "n0q", "n0r", "n0q"];

  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % radarFrames.length);
    }, 400); // smoother animation

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Satellite timestamp
  const [satTimestamp, setSatTimestamp] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.rainviewer.com/public/weather-maps.json")
      .then((res) => res.json())
      .then((data) => {
        const infrared = data?.satellite?.infrared;
        if (Array.isArray(infrared) && infrared.length > 0) {
          const latest = infrared[infrared.length - 1].time;
          setSatTimestamp(latest);
        }
      })
      .catch(() => console.warn("Satellite fetch failed"));
  }, []);

  return (
    <div className="rounded-md overflow-hidden shadow-xl border border-slate-800 mt-10">

      {/* Controls */}
      <div className="flex items-center gap-4 p-3 bg-slate-900 border-b border-slate-700">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <input
          type="range"
          min={0}
          max={radarFrames.length - 1}
          value={frameIndex}
          onChange={(e) => {
            setFrameIndex(Number(e.target.value));
            setIsPlaying(false); // scrub pauses playback
          }}
          className="w-full"
        />
      </div>

      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
      >
        {/* Base map */}
        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Animated NOAA Radar */}
        <TileLayer
          key={frameIndex}
          attribution="NOAA NEXRAD"
          url={`https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-${radarFrames[frameIndex]}/{z}/{x}/{y}.png`}
          opacity={0.8}
        />

        {/* IR Satellite */}
        {satTimestamp && (
          <TileLayer
            attribution="RainViewer Infrared Satellite"
            url={`https://tilecache.rainviewer.com/v2/satellite/${satTimestamp}/256/{z}/{x}/{y}/1/1_1.png`}
            opacity={0.55}
          />
        )}
      </MapContainer>
    </div>
  );
}
