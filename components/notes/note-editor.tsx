"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { useModal } from "@/hooks/use-model-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Editor } from "../editor";

const formSchema = z.object({
  text: z.string().min(1),
});

export const Noteeditor = ({ editF }: { editF: () => void }) => {
  const { setNotes } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const note = await axios.post("/api/note", values);

      setNotes(note.data);
      toast.success("successfilly saved");
      editF();
      router.refresh();
    } catch (error) {
      console.log("internal error");
    }
  }

  const { isValid, isSubmitting } = form.formState;

  return (
    <div className=" relative h-96 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white ">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className="flex justify-between  mt-1
            "
          >
            <Button
              variant="outline"
              className="w-full  z-50 text-white"
              disabled={isSubmitting}
              onClick={editF}
            >
              Cancel
            </Button>
            <Button
              className="w-full z-50"
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
