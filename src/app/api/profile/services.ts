import { isCompositeComponent } from "react-dom/test-utils";
import supabase from "../../utils/supabase";

export async function getProfileDataByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from("trd_profile")
      .select()
      .eq("id", userId);

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

export async function createProfile(data: any) {
  try {
    const { data: profileData, error } = await supabase
      .from("trd_profile")
      .insert(data)
      .select();

    if (error) {
      console.error("Error from supabase while creating profile:", error);
      return null;
    }

    return profileData[0];
  } catch (error) {
    console.error("Error creating profile:", error);
    return null;
  }
}

export async function saveProfileImage(
  image_name: string,
  image_type: string,
  profile_id: string
) {
  try {
    const { data, error } = await supabase.from("trd_profile_image").insert({
      profile_id,
      image_name,
      image_type,
    });

    if (error) {
      console.error("Error uploading profile image:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return null;
  }
}
