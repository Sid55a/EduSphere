import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { codeId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.codeId) {
      return new NextResponse("Missing required fields", { status: 404 });
    }

    const code = await db.code.delete({
      where: {
        id: params.codeId,
      },
    });

    return NextResponse.json(code);
  } catch (error) {
    return new NextResponse("Something went grong", { status: 500 });
  }
}
