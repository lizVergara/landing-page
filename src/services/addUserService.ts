import { Profile } from "../app/features/profile/Profile";

export const createProfile = async (formData: FormData): Promise<any> => {
  const response = await fetch("/api/profile", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to create profile");
  }
  const data = await response.json();
  return data;
};
