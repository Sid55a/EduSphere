import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { codeText, fileName, codeId } = await req.json();

    if (!codeText || !fileName) {
      return new NextResponse("Missing required fields", { status: 404 });
    }
    const code = await db.code.upsert({
      where: {
      fileName:fileName
      },
      update: {
        code: codeText,
        fileName: fileName,
        profileId: profile.id,
      },
      create: {
        code: codeText,
        fileName: fileName,
        profileId: profile.id,
      },
    });
    if (!code) {
      return new NextResponse("InternalError", { status: 500 });
    }
    return NextResponse.json(code);
  } catch (error) {
    console.log("CODE_POST", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
