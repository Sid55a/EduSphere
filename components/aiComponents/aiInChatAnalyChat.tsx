"use client";

import { useModal } from "@/hooks/use-model-store";
import axios from "axios";
import { useEffect, useState } from "react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { Bot, Loader2, ScanFace } from "lucide-react";

export const AiInCHatAnalyChat = (fm: { fm: string }) => {
  const { setAiChatSugg, onOpen, setRawQuery } = useModal();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
  const handleClick = () => {
    
    setRawQuery(fm.fm);
    onOpen("aiInChatAsk");
  };
  return (
    <>
      <div className="px-2">
        <ActionTooltip lable="Ai Chat Q & A">
          <Button
            onClick={handleClick}
            variant="ghost"
            size="icon"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 text-zinc-500 animate-spin my-4" />
            ) : (
              <ScanFace className="h-5 w-5" />
            )}
          </Button>
        </ActionTooltip>
      </div>
    </>
  );
};
