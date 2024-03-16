"use client";

import { Loader2, Music2 } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useModal } from "@/hooks/use-model-store";
import { Tooltip } from "../ui/tooltip";
import ActionTooltip from "../action-tooltip";
import { useState } from "react";
function MusicAi(fm: { fm: string }) {
  const { setAiMusicSugg, onOpen, setCurrEMode } = useModal();
  const [loading, setLoading] = useState(false);
  // console.log(fm.fm);
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/conversationgpt",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "16c576e9b6msh151b4015899ff59p121a0fjsn7980dc6904b1",
          "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
        },
        data: {
          messages: [
            {
              role: "user",
              content: fm.fm,
            },
          ],
          web_access: false,
        },
      });

      setAiMusicSugg(response.data?.result);
      setCurrEMode(1);
      onOpen("aiMusicSugg");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2">
      <ActionTooltip lable="Ai Music Suggestion">
        <Button
          onClick={handleClick}
          variant="ghost"
          size="icon"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 text-zinc-500 animate-spin my-4" />
          ) : (
            <Music2 className="h-5 w-5" />
          )}
        </Button>
      </ActionTooltip>
    </div>
  );
}

export default MusicAi;
