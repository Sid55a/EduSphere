"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-model-store";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Dot, Play, RefreshCw, Triangle, TriangleRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardTitle } from "../ui/card";
import toast from "react-hot-toast";


  import { useEffect, useRef } from 'react';
  import { Player } from '@lordicon/react';
  
import ICON from  '../../public/news.json';


export const NewsModel = () => {
  const router = useRouter();
  const [newsData, setNewsData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, aiChatResult, type } = useModal();
  const isModelOpen = isOpen && type === "newsModal";
  const [joke, setJoke] = useState({ body: "", title: "" });
  const [loading, setLoading] = useState(false);

  
  
  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/newsData");
      setNewsData(res.data);
      console.log(res.data[0]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const playerRef = useRef<Player>(null);
  
    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent
          className={"bg-white text-black pb-6 flex-col items-center justify-center flex  overflow-hidden max-h-max"}
        >
          <div>
          <Player 
            ref={playerRef} 
            size={96}
            icon={ ICON }
        />
          </div>
          <div className="flex flex-col items-center  justify-center w-full space-y-2">
            {newsData?.length > 0 && (
              <Card className=" w-[25rem] bg-slate-900">
                <CardTitle className=" text-center ">
                  <h1 className="mt-2">Current Headlines</h1>
                  <div className="  justify-start items-center text-sm flex text-red-400">
                    <span className=" flex items-center rounded-2xl  h-3 w-11">
                      {" "}
                      <Dot className="h-8 w-8 ml-0 pl-0 animate-ping" />
                      Live
                    </span>
                  </div>
                </CardTitle>
                <ScrollArea>
                  <CardContent className=" h-[25rem] p-4">
                    {newsData.length > 0 &&
                      newsData.map((line, i) => (
                        <div key={i} className=" flex text-justify  mb-2">
                          <p className=" text-xs">
                            <span className="  font-extrabold">
                              {i + 1}
                              {". "}
                            </span>
                            {line}
                          </p>
                         
                        </div>
                      ))}
                  </CardContent>
                </ScrollArea>
              </Card>
            )}
            <Button onClick={getData}>
              Clck For News{" "}
              <Play
                className={cn("h-4 w-4 ml-1 ", loading && "animate-spin")}
              />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
