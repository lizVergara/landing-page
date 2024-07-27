export async function getWeatherData(latitude: string, longitude: string) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`
    );
    const weatherData = await response.json();

    if (!weatherData.current_weather) {
      return null;
    }

    return { temperature: weatherData.current_weather.temperature };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
