import {
  AtSign,
  VenetianMask,
  Bot,
  Hash,
  Map,
  Menu,
  Music,
  Music2,
} from "lucide-react";
import { MobileToggle } from "../mobileToggle";
import { UserAvatar } from "../user-avatar";
import { SocketIndicator } from "../socketIndicator";
import { ChatVideoButton } from "./chatVideoButton";
import { Button } from "../ui/button";
import MusicAi from "../aiComponents/musicAi";
import { db } from "@/lib/db";
import { useModal } from "@/hooks/use-model-store";
import axios from "axios";
import { AiSummary } from "../aiComponents/aiSummary";
import { AiInCHatAnalyChat } from "../aiComponents/aiInChatAnalyChat";
import { currentProfile } from "@/lib/current-profile";
import { Payment } from "../aiComponents/payment";
import { Profile } from "@prisma/client";
import { MapButton } from "./mapButton";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  conversationId?: string;
  currentMemberName?: string;
}

export const ChatHeader = async ({
  serverId,
  name,
  type,
  conversationId,
  imageUrl,
}: ChatHeaderProps) => {
  const profile = await currentProfile();
  let AiQuery = "";
  let AiQueryRaw = "";
  let otherMember = null;
  let AiQ = "";
  if (type === "conversation") {
    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    otherMember =
      conversation?.memberOne?.profileId === profile?.id
        ? conversation?.memberTwo?.profile
        : conversation?.memberOne?.profile;
    const messages = await db.directMessage.findMany({
      where: {
        convertasionId: conversationId,
        deleted: false,
      },
      include: {
        conversation: {
          include: {
            memberOne: { include: { profile: true } },
            memberTwo: { include: { profile: true } },
          },
        },
        member: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    // const conversation = await db.conversation.findFirst({
    //   where: {
    //     id: conversationId,
    //   },
    // });

    // var msg = "";
    const ans = "";
    const finalMessage = messages.reduce(
      (acc, cval) =>
        acc +
        cval?.member.profile.name +
        " says " +
        cval.content +
        " to " +
        `${
          cval.memberId !== cval.conversation.memberOneId
            ? cval.conversation.memberOne.profile.name
            : cval.conversation.memberTwo.profile.name
        }` +
        " then ",
      ans
    );

    if (finalMessage) {
      AiQueryRaw = finalMessage + `end Here ${profile?.name} is myself `;
      AiQ = finalMessage;
      console.log(finalMessage);
      AiQuery =
        "suggest me one hollywood  song name  released after 2017 based on my mood by analysing the given chat : " +
        finalMessage +
        "end. and why in sort description";
    }
  }
  // const MusicAiQuery =
  //   "behave like a metal health counselor suggest me a bollywood song by analysing my mood by analysing the given chat : " +
  //   finalMessage +
  //   "end";

  return (
    <div className=" font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-b-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />

      {type === "channel" && (
        <VenetianMask className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && imageUrl && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-black dark:text-white">{name}</p>

      <div className="ml-auto flex items-center">
        {type == "conversation" && <ChatVideoButton />}
        {type == "conversation" && <MusicAi fm={AiQuery} />}
        {type == "conversation" && <AiSummary fm={AiQ + " end."} />}
        {type == "conversation" && <AiInCHatAnalyChat fm={AiQueryRaw} />}
        {type == "conversation" && (
          <MapButton me={profile} other={otherMember} />
        )}
        {type == "conversation" && <Payment me={profile} other={otherMember} />}

        <SocketIndicator />
      </div>
    </div>
  );
};
