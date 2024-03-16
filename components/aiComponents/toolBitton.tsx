"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Book,
  Bot,
  BrainCircuit,
  Cloud,
  Code,
  Copy,
  CreditCard,
  Dices,
  File,
  Gamepad,
  Gamepad2,
  Github,
  GraduationCap,
  Image,
  Keyboard,
  Laugh,
  LifeBuoy,
  LogOut,
  Mail,
  Map,
  MessageSquare,
  Music,
  Newspaper,
  PartyPopper,
  Pen,
  Plus,
  PlusCircle,
  Settings,
  Text,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-model-store";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { Note, TODO } from "@prisma/client";
import { useEffect } from "react";

interface ToolButtonProps {
  task: TODO[];
  notes: Note[];
}

export const ToolButton = ({ task, notes }: ToolButtonProps) => {
  const { onOpen, setCoord, coord, setTasks, setNotes } = useModal();

  useEffect(() => {
    setTasks(task);
    setNotes(notes);
  }, [task, notes]);

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setCoord(pos.coords.latitude, pos.coords.longitude);
    });
  };
  const router = useRouter();

  const handleMap = async () => {
    getUserLocation();
    onOpen("mapModel");
    // console.log(coord);
    // await axios.patch("/api/map", coord);
  };

  const goToCode = () => {
    router.push(`/code`);
  };
  const goToSummarizer = () => {
    router.push(`/textSummary`);
  };
  const goToPlagerismChecker = () => {
    router.push(`/plagCheck`);
  };

  return (
    <>
      <DropdownMenu>
        <ActionTooltip lable="Entertainment Zone" align="start" side="right">
          <DropdownMenuTrigger className="flex items-center justify-center py-1 px-2 dark:bg-zinc-700 bg-zinc-50 hover:bg-zinc-100 font-semibold dark:hover:bg-zinc-800  rounded-full">
            <Dices className="h-7 w-7 p-1" />
          </DropdownMenuTrigger>
        </ActionTooltip>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuLabel>
            <p className="flex font-semibold items-center justify-center text-zinc-800 dark:text-white">
              Enjoy
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onOpen("musicSelector")}
            className="dark:text-zinc-300 dark:hover:text-white "
          >
            <p className="flex w-full">
              Music <Music className="w-6 h-6 ml-auto" />
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleMap}
            className="dark:text-zinc-300 dark:hover:text-white "
          >
            <p className="flex w-full gap-1">
              Map <Map className="w-6 h-6 ml-auto " />
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onOpen("jokeModel")}
            className="dark:text-zinc-300 dark:hover:text-white "
          >
            <p className="flex w-full gap-1">
              Random Joke <Laugh className="w-6 h-6 ml-auto " />
            </p>
          </DropdownMenuItem>

          {/* <DropdownMenuItem className="dark:text-zinc-300 dark:hover:text-white ">
            <p className="flex w-full">More...</p>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <ActionTooltip lable="Manage Task" align="start" side="right">
          <DropdownMenuTrigger className="flex items-center justify-center py-1 px-2 dark:bg-zinc-700 bg-zinc-50 hover:bg-zinc-100 font-semibold dark:hover:bg-zinc-800  rounded-full">
            <Book className="h-7 w-7 p-1" />
          </DropdownMenuTrigger>
        </ActionTooltip>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuLabel>
            <p className="flex font-semibold items-center justify-center text-zinc-800 dark:text-white">
              Tasks
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onOpen("noteModal")}
            className="dark:text-zinc-300 dark:hover:text-white "
          >
            <p className="flex w-full">
              ToDo/Notes <Pen className="w-4 h-5 ml-auto" />
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onOpen("newsModal")}
            className="dark:text-zinc-300 dark:hover:text-white "
          >
            <p className="flex w-full">
              Latest News <Newspaper className="w-4 h-5 ml-auto" />
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <ActionTooltip lable="Ai Tools" align="start" side="right">
          <DropdownMenuTrigger className="flex items-center justify-center py-1 px-2 dark:bg-zinc-700 bg-zinc-50 hover:bg-zinc-100 font-semibold dark:hover:bg-zinc-800  rounded-full">
            <BrainCircuit className="h-7 w-7 p-1" />
          </DropdownMenuTrigger>
        </ActionTooltip>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuLabel>
            <p className="flex font-semibold items-center justify-center text-zinc-800 dark:text-white">
              Ai Tools
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="dark:text-zinc-300 dark:hover:text-white "
            onClick={() => onOpen("askAnything")}
          >
            <p className="flex w-full justify-center items-center">
              Ask Anything <Bot className="w-6 h-6 ml-2 " />
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="dark:text-zinc-300 dark:hover:text-white "
            onClick={goToCode}
          >
            <p className="flex w-full justify-center items-center">
              Code Editor <Code className="w-6 h-6 ml-2 " />
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="dark:text-zinc-300 dark:hover:text-white "
            onClick={goToSummarizer}
          >
            <p className="flex w-full justify-center items-center">
              Text Summarizer <Text className="w-6 h-6 ml-2 " />
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="dark:text-zinc-300 dark:hover:text-white "
            onClick={goToPlagerismChecker}
          >
            <p className="flex w-full justify-center items-center">
              Plagerism checker <Copy className="w-6 h-6 ml-2 " />
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <ActionTooltip lable="Game Zone" align="start" side="right">
          <DropdownMenuTrigger
            onClick={() => onOpen("gameModel")}
            className="flex items-center justify-center py-1 px-2 dark:bg-zinc-700 bg-zinc-50 hover:bg-zinc-100 font-semibold dark:hover:bg-zinc-800  rounded-full"
          >
            <Gamepad2 className="h-7 w-7 p-1" />
          </DropdownMenuTrigger>
        </ActionTooltip>
      </DropdownMenu>
    </>
  );
};
