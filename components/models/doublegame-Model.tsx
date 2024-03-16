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
import { EggFriedIcon, Gamepad2, Gamepad2Icon, Quote, RefreshCw } from "lucide-react";
import Image from "next/image";

export const DoubleGameModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, aiChatResult, type } = useModal();
  const isModelOpen = isOpen && type === "doublegameModel";
 
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
          className={"bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 text-black pb-6 overflow-hidden max-h-max"}
        >
          <DialogHeader className="pt-4 px-6">
            <div className=" justify-center items-center flex  ">
            <h1 className=" text-center text-white font-bold text-xl">Play With a Friend</h1>
            <span><EggFriedIcon className=" w-8 h-8 text-white ml-5"></EggFriedIcon></span>
            </div>
            <hr className="w-full"></hr>
            <div className=" grid grid-cols-4  p-2 space-y-5">
              <div className="flex-col  items-center  hover:opacity-25 justify-center flex mt-5">
                <Image
                src="/Breakout.jpg"
                alt="game"
                height={50}
                width={50}
                className="  rounded-xl "
                ></Image>
                <span className=" text-xs text-white ">BreakOut</span>
              </div>
              <div className="flex-col  hover:opacity-25 items-center justify-center flex">
                <Image
                src="/ConnectFour.jpg"
                alt="game"
                height={50}
                width={50}
                className="  rounded-xl "
                ></Image>
                <span className=" text-xs text-center text-white ">Connect Four</span>
              </div>
              <div className="flex-col  hover:opacity-25 items-center justify-center flex">
                <Image
                src="/frog.jpg"
                alt="game"
                height={50}
                width={50}
                className="  rounded-xl "
                ></Image>
                <span className=" text-xs text-center text-white ">Frooger</span>
              </div>
              <div className="items-center  hover:opacity-25 justify-center flex-col flex"> 
              <Image
                src="/memory-game.png"
                alt="game"
                height={50}
                width={50}
                className="  rounded-xl "
                ></Image>
                <span className=" text-xs  text-center text-white ">Memory Game</span>
              </div>
              <div className="items-center  hover:opacity-25 justify-center flex-col flex"> 
              <Image
                src="/space.png"
                alt="game"
                height={50}
                width={50}
                className="  rounded-xl "
                ></Image>
                <span className=" text-xs text-center text-white ">Space Invaders</span>
              </div>
              <div className="items-center  hover:opacity-25 justify-center  flex-col flex"> 
              <Image
                src="/mole.jpg"
                alt="game"
                height={50}
                width={50}
                className="  rounded-xl "
                ></Image>
                <p className=" text-xs w-full text-center text-white ">Whac-a-mole</p>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
