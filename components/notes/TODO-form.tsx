"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  Text: z.string().min(1),
});

interface TODOFormProps {
  edit: () => void;
}

const TODOForm = ({ edit }: TODOFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const text = await axios.post("/api/todo", values);

      toast.success("added successfully");
      edit();
      router.refresh();
    } catch {
      console.log("internal error");
    }
  }

  return (
    <div className="w-auto bg-slate-200 rounded-lg p-5">
      <div className=" flex justify-end">
        {" "}
        <Button onClick={edit} variant="ghost" className="bg-black text-white">
          Cancel
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" flex justify-between">
                  <h1 className=" mt-4 text-lg font-semibold">
                    Enter your Task
                  </h1>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="TODO..."
                    {...field}
                    className="bg-slate-100"
                  />
                </FormControl>
                <FormDescription>
                  Enter the event or task you want to remember
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default TODOForm;
