import { Note } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";
import { ArrowLeftCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Preview } from "../preview";

interface NoteReaderProps {
  note: Note;
  open: () => void;
}

export const NoteReader = ({ note, open }: NoteReaderProps) => {
  const router = useRouter();

  const onClick = async () => {
    console.log(note.id);
    await axios.delete(`/api/note/${note.id}`);
    toast.success("successfully deleted");
    router.refresh();
    open();
  };
  return (
    <ScrollArea>
      <div className="w-max-[30rem] ">
        <span className="flex justify-between items-center">
          <ArrowLeftCircle className="cursor-pointer" onClick={open} />
          <Trash
            onClick={onClick}
            className=" h-4 text-red-600 z-50 cursor-pointer"
          />
        </span>
        
        <Preview value={note.text} />
      
      </div>
      </ScrollArea>
    
  );
};
