import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server Id missing", { status: 400 });
    }
    if (!params.channelId) {
      return new NextResponse("Channel Id missing", { status: 400 });
    }
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: ["ADMIN", "MODERATOR"],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "CommunityCorner",
            },
          },
        },
      },
    });
    console.log(server);
    return NextResponse.json(server);
  } catch (error) {
    console.log("CHANNEL_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const { name, type } = await req.json();
    if (!serverId) {
      return new NextResponse("Server Id missing", { status: 400 });
    }
    if (!params.channelId) {
      return new NextResponse("Channel Id missing", { status: 400 });
    }
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: ["ADMIN", "MODERATOR"],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: "CommunityCorner",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("CHANNEL_ID_Edit", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
