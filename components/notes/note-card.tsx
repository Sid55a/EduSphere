import {
  Card,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import { Note } from "@prisma/client";

interface NoteCardProps {
  note: Note;
  index: number;
}

export const NoteCard = ({ note, index }: NoteCardProps) => {
  return (
    <div className="">
      {note.id.length > 0 && (
        <Card className="hover:bg-gray-500  relative h-[5rem] w-full ">
          <CardTitle className=" truncate overflow-hidden w-full max-h-[5rem] text-sm flex text-clip  justify-start"></CardTitle>
          <CardDescription className="text-xs  absolute right-0 p-1 top-[3.5rem] ">
            {note.createdAt.toString()}
          </CardDescription>
        </Card>
      )}
    </div>
  );
};
