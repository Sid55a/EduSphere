"use client";

import { Member, MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import ActionTooltip from "../action-tooltip";
import {
  Bomb,
  Edit,
  FileIcon,
  Languages,
  Loader2,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useModal } from "@/hooks/use-model-store";
import { useParams, useRouter } from "next/navigation";
import { setTimeout } from "timers";
import toast from "react-hot-toast";
import { Badge } from "../ui/badge";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & { profile: Profile };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: (
    <span className=" text-xs  text-center rounded-lg ml-2 text-blue-500">
      {" "}
      Guest
    </span>
  ),
  ADMIN: (
    <span className=" text-xs  text-center rounded-lg ml-2 text-rose-500">
      {" "}
      Admin
    </span>
  ),
};

const formSchema = z.object({
  content: z.string().min(1),
});

function ChatItem({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) {
  const { onOpen, setAiVoiceLink, aiVoiceLink } = useModal();

  const router = useRouter();
  const params = useParams();

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = !isPdf && fileType;

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      const res = await axios.patch(url, values);
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content]);

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }
    router.push(`/servers/${params?.serverId}/conversation/${member.id}`);
  };
  const [loading, setLoading] = useState(false);
  const encodedParams = new URLSearchParams();
  encodedParams.set("from", "auto");
  encodedParams.set("to", "en");
  encodedParams.set("text", content);
  const [transText, setTransText] = useState("");
  const handleTranslate = async () => {
    try {
      const response = await axios.request({
        method: "POST",
        url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "9fec0e4972msh21218c90552c659p1e4ff6jsnb84108350498",
          "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
        },
        data: encodedParams,
      });
      setTransText(response.data.trans);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleExplain = async () => {
    const options = {
      method: "POST",
      url: "https://open-ai21.p.rapidapi.com/qa",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      data: {
        question:
          "Explain what he/she wants to say in simple and explained manner?",
        context: content,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.result);
      setTransText(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoice = async () => {
    try {
      setLoading(true);

      const encodedParams = new URLSearchParams();
      encodedParams.set("voice_code", "en-US-1");
      encodedParams.set("text", content);
      encodedParams.set("speed", "1.00");
      encodedParams.set("pitch", "1.00");
      encodedParams.set("output_type", "audio_url");

      const response = await axios.request({
        method: "POST",
        url: "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "9fec0e4972msh21218c90552c659p1e4ff6jsnb84108350498",
          "X-RapidAPI-Host": "cloudlabs-text-to-speech.p.rapidapi.com",
        },
        data: encodedParams,
      });
      console.log(response.data.result.audio_url);
      setAiVoiceLink(response?.data?.result?.audio_url);
      onOpen("aiTextToVoice");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={onMemberClick}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                {member.profile.name}
              </p>
              <ActionTooltip lable={member.role}>
                <p className=" ml-2">{roleIconMap[member.role]}</p>
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image src={fileUrl} alt="content" fill className="object-fill" />
            </a>
          )}
          {isPdf && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline
              "
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center w-full gap-x-2 pt-2"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="primary">
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press Esc to cancle, Enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {transText && <p className="text-sm w-52"> {transText}</p>}
      <div className="gap-x-2 flex justify-center items-center">
        {" "}
        <ActionTooltip lable="Listen">
          {loading ? (
            <Loader2 className="h-4 w-4 text-zinc-500 animate-spin my-4" />
          ) : (
            <Mic
              onClick={handleVoice}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          )}
        </ActionTooltip>
        <ActionTooltip lable="Translate">
          {loading ? (
            <Loader2 className="h-4 w-4 text-zinc-500 animate-spin my-4" />
          ) : (
            <Languages
              onClick={handleTranslate}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          )}
        </ActionTooltip>
        <ActionTooltip lable="Explain">
          {loading ? (
            <Loader2 className="h-4 w-4 text-zinc-500 animate-spin my-4" />
          ) : (
            <Bomb
              onClick={handleExplain}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          )}
        </ActionTooltip>
      </div>
      <div className="flex">
        {canDeleteMessage && (
          <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
            {canEditMessage && (
              <ActionTooltip lable="Edit">
                <Edit
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer ml-auto w-4 h-4 text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
              </ActionTooltip>
            )}

            <ActionTooltip lable="Delete">
              <Trash
                onClick={() =>
                  onOpen("deleteMessage", {
                    apiUrl: `${socketUrl}/${id}`,
                    query: socketQuery,
                  })
                }
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatItem;
