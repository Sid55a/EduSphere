"use client";

import { useModal } from "@/hooks/use-model-store";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface MusicPlayerProps {
  link: String;
}

export const MusicPlayer = () => {
  const { isOpen, mLink } = useModal();
  console.log(
    `https://open.spotify.com/embed/track/${mLink}?utm_source=generator&theme=0`
  );
  return (
    <>
      <div className={cn("p-5 m-0", !isOpen && "p-0 m-0")}>
        {mLink && (
          <>
            {!isOpen && (
              <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
            )}
            <iframe
              style={{
                borderRadius: "12px",
                padding: 0,
                width: "100%",
              }}
              src={`https://open.spotify.com/embed/track/${mLink}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </>
        )}
      </div>
    </>
  );
};
