"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import { useModal } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { Player } from '@lordicon/react';
import  ICON  from "../../public/mail.json"
export const InviteModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModelOpen = isOpen && type === "invite";
  const origin = useOrigin();
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const onNew = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", { server: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const playerRef = useRef<Player>(null);
  
  useEffect(() => {
      playerRef.current?.playFromBeginning();
  }, [])

  return (

    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl items-center justify-center flex text-center flex-col font-bold">
          <Player 
            ref={playerRef} 
            size={96}
            icon={ ICON }
        />
           <span> Invite People</span>
          
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            hub invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 vorder-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={loading} size="icon">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" onClick={onCopy} />
              )}
            </Button>
          </div>
          <Button
            disabled={loading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            onClick={onNew}
          >
            Generate a new link 
            <RefreshCw className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
