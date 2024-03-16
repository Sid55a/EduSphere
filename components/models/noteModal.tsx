"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Layer, Map, Marker, Source } from "react-map-gl";
import * as z from "zod";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TODOPage } from "../notes/todoPage";
import { Notepage } from "../notes/note";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const NoteModel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, type, tasks, notes } = useModal();
  const isModelOpen = isOpen && type === "noteModal";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className={"bg-white text-black pb-6 overflow-hidden "}>
          <DialogHeader className=" px-6">
            <DialogTitle className="text-2xl text-center font-bold"></DialogTitle>
          </DialogHeader>
          <div>
            <div>
              <Tabs defaultValue="TODO" className=" border border-white  ">
                <TabsList className="  bg-slate-200  flex ">
                  <TabsTrigger value="TODO" className=" basis-1/2 ">
                    TODO list
                  </TabsTrigger>
                  <TabsTrigger value="Notes" className="basis-1/2">
                    Notes
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="TODO">
                  <TODOPage task={tasks} />
                </TabsContent>
                <TabsContent value="Notes">
                  <Notepage  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
