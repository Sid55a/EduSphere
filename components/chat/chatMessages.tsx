"use client";

import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatScroll } from "@/hooks/useChatScroll";
import { useChatSocket } from "@/hooks/useChatSocket";
import { Member, Message, Profile } from "@prisma/client";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useRef } from "react";
import CircularButton from "../dragebleButton";
import ChatItem from "./chatItem";
import ChatWelcome from "./chatWelcome";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

interface ChatMessagesProps {
  userName: string;
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export const ChatMessages = ({
  userName,
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  let finalDataNeeded: { chatContent: string; name: string }[];
  let finalDataNeededToBePassed = "";
  if (data?.pages[0]?.items) {
    const completeData = data?.pages[0].items;

    finalDataNeeded = completeData?.map((chatData: any) => ({
      chatContent: chatData?.content,
      name: chatData?.member?.profile?.name,
    }));

    finalDataNeeded = finalDataNeeded.reverse();

    finalDataNeeded?.map(
      (data: { chatContent: string; name: string }) =>
        (finalDataNeededToBePassed += `${data.name} says ${data.chatContent} then `)
    );
    finalDataNeededToBePassed += `end and in this chat my name is ${userName}`;
  }

  console.log(finalDataNeededToBePassed);

  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  // useEffect(() => {
  //   let final = "";
  //   data?.pages[0]?.items
  //     .slice(0)
  //     .reverse()
  //     .map((msg: any) => {
  //       let cMsg = `${msg.member.profile.name} says ${msg.content} then `;
  //       final += cMsg;
  //       setChat(final);
  //     });
  // }, []);

  return (
    <div
      ref={chatRef}
      className="flex-1 flex flex-col py-4 overflow-y-auto relative w-full"
    >
      {type === "channel" && finalDataNeededToBePassed && (
        <>
          <div className="w-full h-full">
            <CircularButton data={finalDataNeededToBePassed} />
          </div>
        </>
      )}
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
