import { NextRequest, NextResponse } from "next/server";
import {
  getProfileDataByUserId,
  createProfile,
  saveProfileImage,
} from "./services";
import { getOrCreateLocation } from "../location/services";
import { uploadFileToS3 } from "@/app/utils/s3";

export async function POST(req: NextRequest) {
  const Formdata = await req.formData();

  const locationInfo = Formdata.get("location")?.toString();
  const location = locationInfo ? JSON.parse(locationInfo) : null;

  if (!location) {
    return NextResponse.json(
      { error: "Location data is required" },
      { status: 400 }
    );
  }

  location.location_id = location.id;
  delete location.id;
  const locationData = await getOrCreateLocation(location);

  if (!locationData) {
    return NextResponse.json(
      { error: "Error getting or creating location" },
      { status: 500 }
    );
  }
  const result = await createProfile({
    nombre: Formdata.get("name"),
    apellido: Formdata.get("lastName"),
    telefono: Formdata.get("phoneNumber"),
    documento: Formdata.get("document"),
    tipo_documento: Formdata.get("documentType"),
    correo: Formdata.get("email"),
    bill_info: Formdata.get("sameBillingInfo")?.toString() === "true",
    location_id: locationData.id,
  });

  if (!result) {
    return NextResponse.json(
      { error: "Error creating profile" },
      { status: 500 }
    );
  }

  const files = Formdata.getAll("files");

  if (files.length > 0) {
    console.log("Files to upload", files);
    const filesUploaded = await sendAllFiles(files, result.id);
  }

  return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID parameter is required" },
      { status: 400 }
    );
  }

  const profileData = await getProfileDataByUserId(userId);

  if (!profileData) {
    return NextResponse.json({ data: "No profile found" }, { status: 200 });
  }

  return NextResponse.json(profileData);
}
// async function sendAllFiles(files: any, userId: string) {
//   const promises = files.map(async (file: any) => {
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const fileName = `${userId}_${file.name}`; // Concatenar userId y file.name

//     const uploadResponse = await uploadFileToS3(buffer, fileName);
//     console.log("Upload response", uploadResponse);
//     if (!uploadResponse) {
//       return null;
//     }

//     await saveProfileImage(fileName, file.type, userId);
//   });

//   return await Promise.all(promises);
// }
async function sendAllFiles(files: any, userId: string) {
  const promises = files.map(async (file: any) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${userId}_${file.name}`;

    const uploadResponse = await uploadFileToS3(buffer, fileName);
    console.log("Upload response", uploadResponse);
    if (!uploadResponse) {
      return null;
    }

    await saveProfileImage(fileName, file.type, userId);
    // return uploadResponse;
  });

  return await Promise.all(promises);
}
