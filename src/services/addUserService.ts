import { Profile } from "../app/features/profile/Profile";

export const createProfile = async (profileData: Profile): Promise<Profile> => {
  //   const formData = new FormData();
  const formData = JSON.stringify(profileData);
  //   Object.keys(profileData).forEach((key) => {
  //     formData.append(key, profileData[key]);
  //   });

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
