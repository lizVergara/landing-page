import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const latitude = searchParams.get("latitude")?.trim();
  const longitude = searchParams.get("longitude")?.trim();

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Latitude and longitude parameters are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`
    );
    const weatherData = await response.json();
    if (!weatherData.current_weather) {
      return NextResponse.json({ data: "No weather found" }, { status: 200 });
    }
    const temperature = weatherData.current_weather.temperature;
    return NextResponse.json({ temperature });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
