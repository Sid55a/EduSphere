"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Player } from "@lordicon/react";

import { useModal } from "@/hooks/use-model-store";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Disc3, Music2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MusicPlayer } from "../aiComponents/musicPlayer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  name: z.string().min(1, { message: "Music name is required" }),
});

export const MusicSearchModel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen, type } = useModal();
  const isModelOpen = isOpen && type === "musicSelector";

  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [result, setResult] = useState("");
  useEffect(() => {}, [result]);
  const { musicUri, mLink, setCurrEMode } = useModal();
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/conversationgpt",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
          "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
        },
        data: {
          messages: [
            {
              role: "user",
              content:
                "Give me the name of one random hollywood song output in english",
            },
          ],
          web_access: false,
        },
      });
      console.log(response?.data.result);
      setResult(response?.data?.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: "https://spotify81.p.rapidapi.com/search",
        params: {
          q: values?.name,
          type: "multi",
          offset: "0",
          limit: "10",
          numberOfTopResults: "5",
        },
        headers: {
          "X-RapidAPI-Key":
            "9fec0e4972msh21218c90552c659p1e4ff6jsnb84108350498",
          "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
        },
      });

      const track = response?.data.tracks[0].data.uri.split(":")[2];

      form.reset();
      console.log("Api call");
      // setLink(track);
      setCurrEMode(1);
      musicUri(track);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = form.formState.isSubmitting;

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent
          className={cn(
            "bg-white  bg-gradient-to-r from-emerald-100 via-green-100 to-green-50  text-black pb-6 overflow-hidden ",
            mLink && "p-0"
          )}
        >
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Search Any Song
            </DialogTitle>
            <DialogDescription className="text-center font-bold text-zinc-900">
              Search any song by name/album/artist/gener and enjoy seamless
              music with{" "}
              <span className="font-bold text-green-900"> Spotify </span>
              support.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <div className="space-y-8  px-6 flex justify-between items-center">
                <div className="basis-4/5 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-black dark:text-secondary/70">
                          Search Song
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                            placeholder="Enter song"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!isLoading ? (
                  <Button
                    className="ml-auto basis-1/5 text-black dark:text-white font-semibold"
                    variant="success"
                    disabled={isLoading}
                  >
                    Search
                  </Button>
                ) : (
                  <div>
                    <Disc3 className=" h-8 w-8 animate-spin text-green-900"></Disc3>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center  flex-col ">
                {loading ? (
                  <div className="  cursor-pointer mb-2 text-green-700 flex">
                    <Music2 className=" animate-bounce "></Music2>
                    <Music2 className=" animate-bounce delay-100"></Music2>
                    <Music2 className=" animate-bounce delay-150"></Music2>
                  </div>
                ) : (
                  <div
                    className=" text-sm text-red-400 hover:text-red-600 cursor-pointer mb-2"
                    onClick={handleClick}
                  >
                    Play random song...
                  </div>
                )}
                <ScrollArea>
                  <p className="py-2 max-h-60 px-3 rounded-sm bg-green-50">
                    {result}
                  </p>
                </ScrollArea>
              </div>
            </form>
          </Form>
          {mLink && <MusicPlayer />}
        </DialogContent>
      </Dialog>
    </>
  );
};
