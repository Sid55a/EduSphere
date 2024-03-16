import { AtSign,VenetianMask ,Hash } from "lucide-react";
import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import  ICON from './../../public/lock.json';
function ChatWelcome({
  type,
  name,
}: {
  type: "channel" | "conversation";
  name: string;
}) {
  const playerRef = useRef<Player>(null);
  
  useEffect(() => {
      playerRef.current?.playFromBeginning();
  }, [])

  return (
    <div className=" flex item-center  text-center justify-center space-y-2 px-4 mb-4">
      {/* {type === "channel" && (
        <div className="h-[75px] rounded-full w-[75px] bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <VenetianMask className="h-12 w-12 text-white" />
        </div>
      )} */}
      <div>
      <div className="">
      <Player 
            ref={playerRef} 
            icon={ ICON } 
            size={96} 
        />
        </div>
       <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? " Connect  converse  thrive with " : ""}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the start of the ${name}.`
          : `This is the the start of your conversation with ${name}`}
      </p>
      </div>
    </div>
  );
}

export default ChatWelcome;
