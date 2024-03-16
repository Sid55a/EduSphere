"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import ICON  from '../../public/trash.json';
export const DeleteMessageModal = () => {
  const router = useRouter();

  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModelOpen = isOpen && type === "deleteMessage";
  const origin = useOrigin();
  const { apiUrl, query } = data;

  const [loading, setLoading] = useState(false);

  const onCLick = async () => {
    try {
      setLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.delete(url);
      onClose();
      router.refresh();
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
          <DialogTitle className="text-2xl text-center flex-col flex justify-between items-center font-bold">
          <Player 
            ref={playerRef} 
            size={96}
            icon={ ICON }
        />
           <span> Delete Message</span>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? The message will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            {!loading ? (<Button disabled={loading} onClick={onCLick} variant="primary">
              Confirm
            </Button> )
 :(
  <div>
    <Loader2 className=" animate-spin"></Loader2>
  </div>
 )            }
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
