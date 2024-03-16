import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./serverSearch";
import { ChannelType, MemberRole } from "@prisma/client";
import { Badge, VenetianMask } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Hash,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { ServerSection } from "./serverSection";
import { ServerChannel } from "./server-channel";
import ServerMember from "./serverMember";
import { classNames } from "uploadthing/client";
import { MusicPlayer } from "../aiComponents/musicPlayer";
import { useModal } from "@/hooks/use-model-store";
import { Button } from "../ui/button";
import EntertainmentZone from "../aiComponents/entertainment";
import axios from "axios";





export const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }



  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: { orderBy: { createdAt: "asc" } },
      members: { include: { profile: true }, orderBy: { role: "asc" } },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === "TEXT"
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === "AUDIO"
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === "VIDEO"
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const iconMap = {
    [ChannelType.TEXT]: <VenetianMask className="h-4 w-4 mr-2" />,
    [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
    [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />,
  };
  const roleIconMap = {
    GUEST: null,
    MODERATOR:<span className=" text-xs  text-center rounded-lg ml-2 text-blue-500"> Guest</span>,
    ADMIN: <span className=" text-xs  text-center rounded-lg ml-2 text-rose-500"> Admin</span>,
  };
  

  if (!server) {
    return redirect("/");
  }

  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;
  // const { musicUri, link } = useModal();

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />

      <ScrollArea className="flex-1 px-3 ">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channel",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channel",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channel",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>

        <div>
          <EntertainmentZone  />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-2">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />{" "}
            <div className="space-y-2">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-2">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Group Members"
              server={server}
            />
            <div className="space-y-2">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
