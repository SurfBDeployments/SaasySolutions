export async function GET() {
  try {
    // Use environment variable in production, fallback to local FastAPI
    const backendUrl =
      process.env.FASTAPI_URL || "http://127.0.0.1:8000";

    const response = await fetch(`${backendUrl}/api/weather`);

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
