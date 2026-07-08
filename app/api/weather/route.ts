export async function GET() {
  try {
    const backendBase =
      process.env.FASTAPI_URL ||
      process.env.NEXT_PUBLIC_FASTAPI_URL ||
      "http://127.0.0.1:8000";

    const response = await fetch(`${backendBase.replace(/\/$/, "")}/api/weather`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch weather from FastAPI" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Weather proxy error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
