// app/api/weather/route.ts
export async function GET() {
  try {
    // 1. Fetch from your locally running Python API
    const response = await fetch('http://127.0.0.1:8000/api/weather');
// inside your next.js routes.ts

    
    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch weather from Python' }, { status: 500 });
    }

    const data = await response.json();

    // 2. Return the data to your React frontend
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
