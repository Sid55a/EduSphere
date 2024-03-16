import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { lat, lng } = await req.json();

    // console.log(lat+"helloooo");

    const profile = await currentProfile();

    const user = await db.profile.update({
      where: {
        id: profile?.id,
      },
      data: {
        lat: String(lat),
        lng: String(lng),
      },
    });

    // console.log(user);
    // const server = await db.server.update({
    //   where: {
    //     id: serverId,
    //     profileId: profile.id,
    //   },
    //   data: {
    //     members: {
    //       update: {
    //         where: {
    //           id: params.memberId,
    //           profileId: {
    //             not: profile.id,
    //           },
    //         },
    //         data: { role },
    //       },
    //     },
    //   },
    //   include: {
    //     members: {
    //       include: {
    //         profile: true,
    //       },
    //       orderBy: {
    //         role: "asc",
    //       },
    //     },
    //   },
    // });
    return NextResponse.json(profile);
  } catch (error) {
    console.log("Member Id Patch error", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
