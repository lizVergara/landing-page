import { NextRequest, NextResponse } from "next/server";
import { Location } from "../../features/location/Location";
import { getLocationsByName } from "./services";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const locationsResult = await getLocationsByName(query);

  if (locationsResult.length === 0) {
    return NextResponse.json({ data: "No locations found" }, { status: 200 });
  }

  return NextResponse.json(locationsResult);
}
