"use client";

import { Dot, LineChartIcon, Link, Plug } from "lucide-react";
import { useSocket } from "./provider/socketProvider";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="text-yellow-600 border-none"
      >
     Connecting
    <Plug className=" h-4 w-4 animate-bounce"></Plug>
      </Badge>
    );
  }

  return (
    <Badge
      variant={"outline"}
      className="  text-green-600  border-none"
    >
    <Dot className="animate-bounce"></Dot> Connected
    </Badge>
  );
};
