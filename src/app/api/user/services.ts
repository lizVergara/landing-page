import supabase from "../../utils/supabase";
import { retrieveFileFromS3 } from "@/app/utils/s3";

export async function getProfileDataByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from("trd_profile")
      .select("*, trd_location (*)")
      .eq("documento", userId);

    if (error) {
      console.error("Error fetching profile data:", error);
      return null;
    }
    const images = await getImagesFromProfile(data[0]?.id);
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
