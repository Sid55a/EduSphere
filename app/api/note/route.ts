import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { text } = await req.json();
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const task = await db.note.create({
      data: {
        userId,
        text,
      },
    });

    const allTask = await db.note.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(allTask);
  } catch (error) {
    console.log("[TODO]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
