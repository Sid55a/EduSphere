"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import qs from "query-string";
import { useModal } from "@/hooks/use-model-store";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";

export const DeleteChannelModal = () => {
  const router = useRouter();

  const { isOpen, onClose, onOpen, type, data } = useModal();
  const isModelOpen = isOpen && type === "deleteChannel";
  const origin = useOrigin();
  const { server, channel } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [loading, setLoading] = useState(false);

  const onCLick = async () => {
    try {
      setLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?{" "}
            <span className="font-semibold text-indigo-500">
              {channel?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={loading} onClick={onCLick} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
