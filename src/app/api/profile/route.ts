import { NextRequest, NextResponse } from "next/server";
import { getProfileDataByUserId, createProfile } from "./services";

export async function POST(req: NextRequest) {
  const Formdata = await req.formData();
  console.log(Formdata);
  const result = await createProfile({
    nombre: Formdata.get("name"),
    apellido: Formdata.get("lastName"),
    telefono: Formdata.get("phoneNumber"),
    documento: Formdata.get("document"),
    tipo_documento: Formdata.get("documentType"),
    correo: Formdata.get("email"),
  });

  if (!result) {
    return NextResponse.json(
      { error: "Error creating profile" },
      { status: 500 }
    );
  }

  const files = Formdata.getAll("files");

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
