"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
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
import { useRef } from "react";
import { Player } from "@lordicon/react";
import FileUpload from "../file-upload";
import ICON from "../../public/clap.json";
import { redirect, useRouter } from "next/navigation";
import { MusicPlayer } from "../aiComponents/musicPlayer";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Gamepad2, Gamepad2Icon, Quote, RefreshCw } from "lucide-react";
import Image from "next/image";

import { TypeAnimation } from "react-type-animation";

<TypeAnimation
  sequence={[
    // Same substring at the start will only be typed out once, initially
    "We produce food for Mice",
    1000, // wait 1s before replacing "Mice" with "Hamsters"
    "We produce food for Hamsters",
    1000,
    "We produce food for Guinea Pigs",
    1000,
    "We produce food for Chinchillas",
    1000,
  ]}
  wrapper="span"
  speed={50}
  style={{ fontSize: "2em", display: "inline-block" }}
  repeat={Infinity}
/>;

export const GameModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, aiChatResult, type } = useModal();
  const isModelOpen = isOpen && type === "gameModel";

  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { onOpen } = useModal();

  if (!isMounted) {
    return null;
  }
  const handleClick = (type: string) => {
    let path;
    switch (type) {
      case "singlePlayer":
        {
          path = "singleplayer";
          router.push(`/games/${path}`);
        }
        break;
      case "2player":
        {
          path = "2-player-games";
          router.push(`/games/${path}`);
        }
        break;
      case "multiplayer":
        {
          path = "multiplayer";
          router.push(`/games/${path}`);
        }
        break;
    }
  };
  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent
          className={
            "bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 text-black pb-6 overflow-hidden max-h-max"
          }
        >
          <DialogTitle className=" text-center text-bold  font-extrabold  ">
            <span className=" text-transparent bg-clip-text text-4xl bg-gradient-to-br from-blue-500 via-green-500 to-pink-500  ">
              Game Zone
            </span>
            <h1 className=" text-white mb-4   text-xl  ">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Level up your fun at game Zone",
                  1000,
                  "Here every play is an adventure!",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
          </DialogTitle>
          <DialogHeader className="pt-4 px-6 text-white text-2xl font-mono  font-bold  uppercase  ">
            <h1
              onClick={() => handleClick("singlePlayer")}
              className="hover:text-lime-400 cursor-pointer"
            >
              Single Player
            </h1>
            <h1
              onClick={() => handleClick("2player")}
              className="hover:text-lime-400 cursor-pointer"
            >
              Two Player Games
            </h1>
            <h1
              onClick={() => handleClick("multiplayer")}
              className="hover:text-lime-400 cursor-pointer"
            >
              {" "}
              Multiplayer Online{" "}
            </h1>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
