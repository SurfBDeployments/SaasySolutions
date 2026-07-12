declare const process: {
  env: {
    FASTAPI_URL?: string;
    NEXT_PUBLIC_FASTAPI_URL?: string;
  };
};

export const dynamic = "force-dynamic";

const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=35.7796&longitude=-78.6382&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_gusts_10m,wind_direction_10m,visibility,surface_pressure,weather_code&timezone=America%2FNew_York&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch";

async function getFallbackWeather() {
  const response = await fetch(OPEN_METEO_URL, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Open-Meteo weather request failed");
  }

  const data = await response.json();
  const current = data.current;

  return {
    current: {
      temperature_2m: current.temperature_2m,
      relative_humidity_2m: current.relative_humidity_2m,
      cloud_cover: current.cloud_cover,
      wind_gusts_10m: current.wind_gusts_10m,
      wind_direction_10m: current.wind_direction_10m,
      visibility: current.visibility,
      surface_pressure: current.surface_pressure,
      time: current.time,
      weather_code: current.weather_code,
    },
    location: {
      utc_offset_seconds: data.utc_offset_seconds ?? 0,
      elevation: data.elevation ?? 0,
      latitude: data.latitude ?? 35.7796,
      longitude: data.longitude ?? -78.6382,
    },
  };
}

export async function GET() {
  try {
    const backendBase = process.env.FASTAPI_URL || process.env.NEXT_PUBLIC_FASTAPI_URL;

    if (backendBase) {
      try {
        const backendUrl = backendBase.endsWith("/api/weather")
          ? backendBase
          : `${backendBase.replace(/\/$/, "")}/api/weather`;

        const response = await fetch(backendUrl, {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          return Response.json(data);
        }
      } catch (error) {
        console.warn("FastAPI weather proxy failed, using fallback data:", error);
      }
    }

    const fallbackData = await getFallbackWeather();
    return Response.json(fallbackData);
  } catch (error) {
    console.error("Weather proxy error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
