"use client";

import { Globe2, Loader2, Map } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-model-store";

interface PaymentModalProps {
  me: any;
  other: any;
}

export const MapButton = ({ me, other }: PaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const { setAiChatSugg, onOpen, setRawQuery, setCoord } = useModal();

  useEffect(() => {}, []);
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setCoord(pos.coords.latitude, pos.coords.longitude);
    });
    const type = "conversation";
    onOpen("mapModel", { me, other, type });
  };
  return (
    <>
      <div className="px-2">
        <ActionTooltip lable="Location">
          <Button
            onClick={handleClick}
            variant="ghost"
            size="icon"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 text-zinc-500 animate-spin my-4" />
            ) : (
              <Globe2 className="h-5 w-5" />
            )}
          </Button>
        </ActionTooltip>
      </div>
    </>
  );
};
