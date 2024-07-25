// src/app/api/location/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Location } from "../../features/location/Location";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
    );
    const result = await response.json();
    const locations: Location[] = result.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      elevation: item.elevation,
      country_code: item.country_code,
      country_id: item.country_id,
      country: item.country,
      admin1: item.admin1,
      admin2: item.admin2,
      admin3: item.admin3,
    }));
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
