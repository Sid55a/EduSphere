"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import FileUpload from "../file-upload";
import { redirect, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { MusicPlayer } from "../aiComponents/musicPlayer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Bot } from "lucide-react";

import ICON from "../../public/ai.json";
const formSchema = z.object({
  name: z.string().min(1, { message: "Music name is required" }),
});

export const AiInChatAnalyChatModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const {
    isOpen,
    onClose,
    onOpen,
    type,
    setAiAskResult,
    aiAskResult,
    rawQuery,
    fnqResult,
    setFnqResult,
  } = useModal();
  const isModelOpen = isOpen && type === "aiInChatAsk";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/qa",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
          "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
        },
        data: {
          question: values.name,
          context: rawQuery,
        },
      });
      console.log(response.data.result);
      setFnqResult(response?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  const isLoading = form.formState.isSubmitting;

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent
          className={cn(
            "bg-white text-black pb-6 overflow-hidden flex flex-col",
            aiAskResult && "w-[800px] h-[590px] "
          )}
        >
          <div className=" ">
            <DialogHeader className="pt-8 px-6">
              <DialogTitle className="text-2xl text-center items-center justify-center flex flex-col font-bold">
                <Player ref={playerRef} icon={ICON} size={96} />
                <span>How can i help you?</span>
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500 flex flex-col">
                <p>Ask anything related to the chat going on ...</p>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 "
              >
                <div className="space-y-8  px-6 flex justify-between items-center">
                  <div className="basis-4/5 ">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                            Ask anything
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                              placeholder="Write your question here"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    className="ml-auto basis-1/5 text-black dark:text-white font-semibold"
                    variant="primary"
                    disabled={isLoading}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          {fnqResult && (
            <ScrollArea>
              <div className="bg-yellow-50 py-2 px-3 rounded-sm text-justify ">
                {fnqResult}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
