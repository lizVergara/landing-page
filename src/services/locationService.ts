export const fetchLocations = async (query: string): Promise<Location[]> => {
  const response = await fetch(`/api/location?query=${query}`);
  const data = await response.json();
  return data;
};
