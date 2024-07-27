import { Profile } from "../app/features/profile/Profile";

export const createProfile = async (profileData: Profile): Promise<Profile> => {
  const formData = new FormData();
  //   const formData = JSON.stringify(profileData);
  formData.append("name", profileData.name);
  formData.append("lastName", profileData.lastName);
  formData.append("documentType", profileData.documentType);
  formData.append("document", profileData.document ?? "");
  formData.append("email", profileData.email);
  formData.append("phoneNumber", profileData.phoneNumber);
  formData.append("sameBillingInfo", profileData.sameBillingInfo.toString());
  if (profileData.location) {
    formData.append("location", JSON.stringify(profileData.location));
  }
  // archivos, es un arreglo de archivos, key files
  //   Object.keys(profileData).forEach((key) => {
  //     formData.append(key, profileData[key]);
  //   });
  console.log(formData);
  const response = await fetch("/api/profile", {
    headers: { "Content-Type": "multipart/form-data" },
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to create profile");
  }
  const data = await response.json();
  return data;
};
