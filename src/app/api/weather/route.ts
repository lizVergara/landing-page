import { NextRequest, NextResponse } from "next/server";
import { getWeatherData } from "./services";

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

  const weatherData = await getWeatherData(latitude, longitude);

  if (!weatherData) {
    return NextResponse.json({ data: "No weather found" }, { status: 400 });
  }

  return NextResponse.json(weatherData);
}
