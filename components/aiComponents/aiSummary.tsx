"use client";

import { useModal } from "@/hooks/use-model-store";
import axios from "axios";
import { Bot, Loader2 } from "lucide-react";
import { useState } from "react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";

export const AiSummary = (fm: { fm: string }) => {
  const { setAiChatSugg, onOpen } = useModal();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/summary",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
          "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
        },
        data: {
          text: fm.fm,
        },
      });
      console.log(response.data.result);
      setAiChatSugg(response?.data?.result);
      onOpen("aiChatSumm");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleClick = () => {
  //   query({
  //     inputs: fm.fm,
  //   }).then((response) => {
  //     setLoading(false);
  //     console.log(JSON.stringify(response));
  //   });
  // };
  return (
    <>
      <div className="px-2">
        <ActionTooltip lable="Ai Chat Summary">
          <Button
            onClick={handleClick}
            variant="ghost"
            size="icon"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 text-zinc-500 animate-spin my-4" />
            ) : (
              <Bot className="h-5 w-5" />
            )}
          </Button>
        </ActionTooltip>
      </div>
    </>
  );
};
