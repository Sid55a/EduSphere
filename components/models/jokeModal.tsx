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

import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {useRef } from 'react';
import { Player } from '@lordicon/react';
import FileUpload from "../file-upload";
import ICON from '../../public/clap.json';
import { redirect, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { MusicPlayer } from "../aiComponents/musicPlayer";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Quote, RefreshCw } from "lucide-react";

export const JokeModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, aiChatResult, type } = useModal();
  const isModelOpen = isOpen && type === "jokeModel";
  const [joke, setJoke] = useState({ body: "", title: "" });
  const [loading, setLoading] = useState(false);

  const handleClickJoke = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: "https://world-of-jokes1.p.rapidapi.com/v1/jokes/random-joke",
        headers: {
          "X-RapidAPI-Key":
            "9fec0e4972msh21218c90552c659p1e4ff6jsnb84108350498",
          "X-RapidAPI-Host": "world-of-jokes1.p.rapidapi.com",
        },
      });
      console.log(response.data);
      setJoke({ title: response?.data?.title, body: response?.data?.body });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const playerRef = useRef<Player>(null);
  
    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent
          className={"bg-white text-black pb-6 overflow-hidden max-h-max"}
        >
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center justify-center items-center flex flex-col font-bold">
            <Player 
            ref={playerRef} 
            size={96}
            icon={ ICON }
            />
              <span>Random Joke</span>
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {joke.body.length > 0 ? (
                <div className=" rounded-md mt-1 p-1 relative">
                  <ScrollArea>
                    <div className="flex flex-col justify-start items-center p-2 text-sm font-semibold text-center gap-y-2 ">
                      <p>🤔:{joke.title}</p>
                      <p>🤣:{joke.body}</p>
                    </div>
                  </ScrollArea>

                  <RefreshCw
                    onClick={handleClickJoke}
                    className={cn(
                      "h-4 w-4 absolute right-[-5px] top-[-20px] cursor-pointer",
                      loading && "animate-spin"
                    )}
                  />
                </div>
              ) : (
              <div className=" flex justify-center items-center ">
                  <Button
                    onClick={handleClickJoke}
                    className="mt-3 bg-black hover:bg-white"
                  >
                     Generate
                  </Button>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
