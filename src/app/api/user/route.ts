import { NextRequest, NextResponse } from "next/server";
import { getProfileDataByUserId } from "./services";
import { getWeatherData } from "../weather/services";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const userId = formData.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID parameter is required" },
      { status: 400 }
    );
  }
  const profileData = await getProfileDataByUserId(userId.toString());

  if (!profileData) {
    return NextResponse.json({ data: "No profile found" }, { status: 200 });
  }
  const wheather = await getWeatherData(
    profileData.trd_location.latitude,
    profileData.trd_location.longitude
  );

  return NextResponse.json({ result: profileData, wheather: wheather });
}
