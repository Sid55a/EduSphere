"use client";

import { Code, Profile } from "@prisma/client";
import axios from "axios";
import { PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const CodeSidebar = ({
  codes,
  profile,
}: {
  codes: Code[];
  profile: Profile;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClick = (codeId: string) => {
    router.push(`/code/${profile.id}/id/${codeId}`);
  };
  const addNew = () => {
    router.push(`/code/${profile.id}`);
  };
  const handleDelete = async (codeId: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/code/${codeId}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[14.5rem] z-20 flex-col fixed inset-y-0">
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
          <div className="mt-2 relative ">
            <div/>
            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
            <ActionTooltip lable="add new file">
            <Button
              disabled={loading}
              size="sm"
              variant="ghost"
              onClick={addNew}
              className=" hover:dark:bg-[#2B2D31] absolute top-[0.5rem] right-0"
            >
              <PlusCircle className=" h-6 w-6 text-gray-600   hover:text-white"></PlusCircle>
            </Button>
            </ActionTooltip>

            {codes.length > 0 ? (
              <div className=" top-8 relative">
                {codes.map((code) => (
                  <div 
                  key={code.id}
                  className="flex m-auto  py-2 w-full cursor-pointer">
                    <div
                     className="w-full px-2 hover:text-blue-400"
                      onClick={() => handleClick(code.id)}
                    >
                      {code.fileName}
                    </div>
                    <div className="px-2 flex gap-2">
                      {loading ?<></>
                        :<Trash
                          className="h-4 w-4 cursor-pointer hover:text-red-400"
                          onClick={() => handleDelete(code.id)}
                        />}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" text-center relative top-[20rem] text-gray-600">No codes found</div>
            )}
            
          </div>
        </div>

        <div className="mb-2">
          <div className="space-y-2"></div>
        </div>
      </div>
    </div>
   
  );
};
