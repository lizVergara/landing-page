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
    if (!result.results || result.results.length === 0) {
      return NextResponse.json({ data: "No locations found" }, { status: 200 });
    }
    const locations: Location[] = result.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      elevation: item.elevation,
      country_code: item.country_code.toLowerCase(),
      country_id: item.country_id,
      country: item.country,
      admin1: item.admin1,
      admin2: item.admin2,
      admin3: item.admin3,
      image: `https://hatscripts.github.io/circle-flags/flags/${item.country_code.toLowerCase()}.svg`,
    }));
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching location data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
