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
