import supabase from "../../utils/supabase";
import { retrieveFileFromS3 } from "@/app/utils/s3";

export async function getProfileDataByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from("trd_profile")
      .select("*, trd_location (*)")
      .eq("id", userId);

    if (error) {
      console.error("Error fetching profile data:", error);
      return null;
    }

    const images = await getImagesFromProfile(userId);
    if (!images) {
      data[0].images = [];
    } else {
      const imagesUrls = images.map(async (image: any) => {
        return await retrieveFileFromS3(image.image_name).then((url) => url);
      });

      data[0].images = await Promise.all(imagesUrls);
    }

    return data[0];
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
}

export async function createProfile(data: any) {
  try {
    const { data: existingProfiles, error: existingProfilesError } =
      await supabase
        .from("trd_profile")
        .select()
        .eq("documento", data.documento);

    if (existingProfilesError) {
      console.error("Error checking existing profiles:", existingProfilesError);
      return null;
    }

    if (existingProfiles && existingProfiles.length > 0) {
      console.log("Ya existe un perfil con el mismo documento de identidad");
      return {
        error: "Ya existe un perfil con el mismo documento de identidad",
      };
    }

    const { data: profileData, error: createProfileError } = await supabase
      .from("trd_profile")
      .insert(data)
      .select();

    if (createProfileError) {
      console.error(
        "Error from supabase while creating profile:",
        createProfileError
      );
      return null;
    }

    return profileData[0];
  } catch (error) {
    console.error("Error creating profile:", error);
    return null;
  }
}

export async function getImagesFromProfile(profile_id: string) {
  try {
    const { data, error } = await supabase
      .from("trd_profile_image")
      .select()
      .eq("profile_id", profile_id);

    if (error) {
      console.error("Error fetching profile images:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching profile images:", error);
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
