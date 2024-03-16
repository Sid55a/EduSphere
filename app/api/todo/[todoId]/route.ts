import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const task = await db.tODO.update({
      where: {
        userId: userId,
        id: params.todoId,
      },
      data: {
        status: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("[TODO]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const task = await db.tODO.delete({
      where: {
        userId: userId,
        id: params.todoId,
      },
    });

    return NextResponse.json("successfull");
  } catch (error) {
    console.log("[TODO]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
