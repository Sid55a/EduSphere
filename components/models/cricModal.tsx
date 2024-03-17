"use client";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-model-store";
import { Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CricModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, cricData, type } = useModal();
  const isModelOpen = isOpen && type === "cricketModel";
  const [joke, setJoke] = useState({ body: "", title: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent
          className={"bg-white text-black flex justify-center items-center"}
        >
          <div className=" w-[25rem] ">
            {cricData.matchHistory.length > 1 && (
              <Card className="bg-black">
                <CardHeader>
                  <CardTitle className=" text-sm  flex justify-between font-extralight text-white">
                    <span>{cricData.seriesName}</span>
                    <span className=" text-orange-400 flex ">
                      <Dot className=" h-8  w-8 animate-bounce" />
                      <span> {cricData.matchStatus} </span>
                    </span>
                  </CardTitle>
                  <CardDescription className="font-extralight text-white">
                    {cricData.matchHistory}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className=" flex text-lg text-white justify-between">
                    <h2 className="">{cricData.team1Name}</h2>
                    <span>{cricData.team1Runs}</span>
                  </div>
                  <div className=" flex text-lg text-white justify-between">
                    <h2 className="">{cricData.team2Name}</h2>
                    <span>{cricData.team2Runs}</span>
                  </div>
                  <p className=" text-lg font-light text-white font-sans">
                    {cricData.matchCurrentInfo}
                  </p>

                  <hr className="w-full  border-slate-500" />

                  <div className=" text-sm grid gap-x-15 grid-cols-2 text-white font-light p-2">
                    <span> {cricData.player1}</span>
                    <span> {cricData.player3}</span>
                    <span> {cricData.player2}</span>
                    <span>
                      {" "}
                      {cricData.player4 !== "undefined : undefined"
                        ? cricData.player4
                        : " "}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
