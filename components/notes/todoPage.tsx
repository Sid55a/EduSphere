"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { PlusCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { useModal } from "@/hooks/use-model-store";
import { cn } from "@/lib/utils";
import { TODO } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import TODOForm from "./TODO-form";

interface TODOProps {
  task: TODO[];
}

export const TODOPage = ({ task }: TODOProps) => {
  const router = useRouter();
  const { setTasks } = useModal();
  const [isEditing, setisEditing] = useState(false);
  const [isMounting, setisMounting] = useState(false);
  // console.log(task);
  const Edit = () => {
    setisEditing((curr) => !curr);
  };

  useEffect(() => {
    setisMounting(true);
  }, []);

  if (!isMounting) {
    return;
  }

  const done = async (todoId: string) => {
    try {
      const isdone = await axios.post(`/api/todo/${todoId}`);
      setTasks(isdone.data);
      toast.success("updated Successfully");
      router.refresh();
    } catch {
      console.log("internal error");
    }
  };

  const Delete = async (todoId: string) => {
    try {
      const isdone = await axios.delete(`/api/todo/${todoId}`);
      toast.success("deleted Successfully");
      router.refresh();
    } catch {
      console.log("internal error");
    }
  };

  return (
    <div className="">
      {!isEditing && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle className=" flex justify-between">
                <h1>Your TODO List</h1>
                <Button
                  disabled={isEditing}
                  onClick={Edit}
                  variant="ghost"
                  className=" text-sm  font-light flex "
                >
                  <>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Task
                  </>
                </Button>
              </CardTitle>
              <CardDescription>you can add or remove tasks</CardDescription>
            </CardHeader>
            <ScrollArea>
              <CardContent className=" h-60">
                {task.length>0 &&
                  task?.map((todo: any) => (
                    <div key={todo.id} className="   mb-3  ">
                     
                      <div className=" flex space-x-3 justify-between">
                        <div>
                          <Checkbox
                            defaultChecked={todo.status}
                            onClick={() => done(todo.id)}
                          />
                          <label className={cn(todo.status && " line-through")}>
                            {" "}
                            {todo.Text}{" "}
                          </label>
                        </div>
                        <Trash
                          onClick={() => Delete(todo.id)}
                          className=" h-4 w-4 text-red-400"
                        />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </ScrollArea>
            <CardFooter>
              <p></p>
            </CardFooter>
          </Card>
        </div>
      )}
      {isEditing && (
        <div>
          <TODOForm edit={Edit} />
        </div>
      )}
    </div>
  );
};
