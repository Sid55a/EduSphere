"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import { useModal } from "@/hooks/use-model-store";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
const ICON = require('../../public/trash.json');
export const DeleteServerModal = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModelOpen = isOpen && type === "deleteServer";
  const origin = useOrigin();
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [loading, setLoading] = useState(false);

  const onCLick = async () => {
    
    try {
      setLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      onClose();
      router.refresh();
      router.push("/");
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
          <DialogTitle className="text-2xl text-center items-center justify-center flex-col flex font-bold">
          <Player 
            ref={playerRef} 
            icon={ ICON }
            size={96}
        />
           <span>Delete Server</span> 
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? {" "}
            <span className="font-semibold text-indigo-500">
              { server?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            { !loading ? (<Button disabled={loading} onClick={onCLick} variant="primary">
              Confirm
            </Button>):(
              <div>
                <Loader2 className=" animate-spin"></Loader2>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
