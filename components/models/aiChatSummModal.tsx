"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-model-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";
import { ScrollArea } from "../ui/scroll-area";

export const AiChatSummModel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, aiChatResult, type } = useModal();
  const isModelOpen = isOpen && type === "aiChatSumm";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className={"bg-white text-black pb-6 overflow-hidden "}>
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Chat Summary
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {aiChatResult && (
                <ScrollArea>
                  <div className="bg-yellow-50 py-2 px-3 rounded-sm text-justify">
                    {aiChatResult}
                  </div>
                </ScrollArea>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
