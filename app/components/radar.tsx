"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useRef, useState } from "react";

type RadarFrame = {
  time: number;
  path: string; // e.g. "/v2/radar/1234567890"
};

export default function RadarMap() {
  const center: LatLngExpression = [35.7721, -78.6386]; // Raleigh

  const [frames, setFrames] = useState<RadarFrame[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [satTimestamp, setSatTimestamp] = useState<number | null>(null);

  // Two-layer crossfade: "front" is visible, "back" loads the incoming frame
  // then swaps once its tiles are ready, so there's no pop/flash.
  const [frontIdx, setFrontIdx] = useState(0);
  const [backIdx, setBackIdx] = useState<number | null>(null);
  const [backOpacity, setBackOpacity] = useState(0);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch real RainViewer radar timestamps (actual past frames, ~10 min apart)
  useEffect(() => {
    fetch("https://api.rainviewer.com/public/weather-maps.json")
      .then((res) => res.json())
      .then((data) => {
      
        const past: RadarFrame[] = data?.radar?.past ?? [];
const nowcast: RadarFrame[] = data?.radar?.nowcast ?? [];
        
        const all: RadarFrame[] = [...past, ...nowcast].map((f) => ({
          time: f.time,
          path: f.path,
        }));
        if (all.length) {
          setFrames(all);
          setFrameIndex(all.length - 1); // start on most recent
          setFrontIdx(all.length - 1);
        }

        const infrared = data?.satellite?.infrared;
        if (Array.isArray(infrared) && infrared.length > 0) {
          setSatTimestamp(infrared[infrared.length - 1].time);
        }
      })
      .catch(() => console.warn("RainViewer fetch failed"));
  }, []);

  // Advance through the loop
  const scheduleCrossfade = useCallback(
    (nextIndex: number) => {
      if (frames.length === 0 || nextIndex === frontIdx) return;

      setBackIdx(nextIndex);
      setBackOpacity(0);

      // Let the tile layer mount, then trigger the CSS opacity transition
      const raf = requestAnimationFrame(() => {
        setBackOpacity(0.8);
      });

      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      fadeTimeout.current = setTimeout(() => {
        setFrontIdx(nextIndex);
        setBackIdx(null);
        setBackOpacity(0);
        cancelAnimationFrame(raf);
      }, 350); // matches CSS transition duration below
    },
    [frontIdx, frames.length]
  );

  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => {
        const next = (prev + 1) % frames.length;
        scheduleCrossfade(next);
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, frames.length, scheduleCrossfade]);

  const frontFrame = frames[frontIdx];
  const backFrame = backIdx !== null ? frames[backIdx] : null;

  return (
    <div className="rounded-md overflow-hidden shadow-xl border border-slate-800 mt-10">
      {/* Controls */}
      <div className="flex items-center gap-4 p-3 bg-slate-900 border-b border-slate-700">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          style={{ cursor: "pointer" }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <input
          type="range"
          min={0}
          max={Math.max(frames.length - 1, 0)}
          value={frameIndex}
          onChange={(e) => {
            const nextIndex = Number(e.target.value);
            setFrameIndex(nextIndex);
            setIsPlaying(false); // scrub pauses playback
            scheduleCrossfade(nextIndex);
          }}
          className="w-full"
        />

        {frontFrame && (
          <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
            {new Date(frontFrame.time * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
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

        {/* Visible radar frame */}
        {frontFrame && (
          <TileLayer
            attribution="RainViewer Radar"
            url={`https://tilecache.rainviewer.com${frontFrame.path}/256/{z}/{x}/{y}/2/1_1.png`}
            opacity={0.8}
          />
        )}

        {/* Incoming radar frame, fades in on top, then becomes front */}
        {backFrame && (
          <TileLayer
            key={backFrame.time}
            attribution="RainViewer Radar"
            url={`https://tilecache.rainviewer.com${backFrame.path}/256/{z}/{x}/{y}/2/1_1.png`}
            opacity={backOpacity}
            eventHandlers={{
              add: (e) => {
                // ensure new tiles start transitioning in smoothly
                const pane = e.target.getContainer?.();
                if (pane) pane.style.transition = "opacity 350ms linear";
              },
            }}
          />
        )}

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