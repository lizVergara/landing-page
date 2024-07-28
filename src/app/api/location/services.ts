import supabase from "../../utils/supabase";

export async function getLocationsByName(name: string) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}`
    );
    const result = await response.json();
    if (!result.results || result.results.length === 0) {
      return [];
    }

    return result.results.map((item: any) => ({
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
  } catch (error) {
    console.error("Error fetching location data:", error);
    return [];
  }
}

export async function getOrCreateLocation(data: any) {
  try {
    const existedLocation = await getLocationByIdInDB(data.location_id);
    if (existedLocation) {
      return existedLocation;
    }

    const { data: locationData, error } = await supabase
      .from("trd_location")
      .insert(data)
      .select();

    if (error) {
      console.error("Error from supabase while creating profile:", error);
      return null;
    }

    return locationData[0];
  } catch (error) {
    console.error("Error creating profile:", error);
    return null;
  }
}

export async function getLocationByIdInDB(location_id: number) {
  try {
    const { data, error } = await supabase
      .from("trd_location")
      .select()
      .eq("location_id", location_id);

    if (error) {
      console.error("Error fetching profile data:", error);
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
}
