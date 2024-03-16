"use client";

import { useModal } from "@/hooks/use-model-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Paperclip, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EmojiPicker } from "../emojiPicker";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  content: z.string().min(1),
});
interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const { onOpen } = useModal();
  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className=" flex  space-x-2  relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => {
                      onOpen("messageFile", { apiUrl, query });
                    }}
                    className=" h-[3rem] w-[3.5rem] p-1  text:bg-zinc-400 bg-gray-400  dark:bg-slate-900 hover:text-zinc-600 dark:hover:text-zinc-300 transition rounded-full  flex items-center justify-center"
                  >
                    <Paperclip className="text-white h-8 w-8  dark:text-slate-300  text-gree" />
                  </button>
                  <Input
                    disabled={isLoading}
                    placeholder={`Type your message here ${
                      type === "conversation" ? name : "" + name
                    }`}
                    {...field}
                    className="px-6 py-6 rounded-2xl border-line-none  border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-400  dark:bg-slate-900  "
                  />

                  <Button
                    variant="ghost"
                    type="submit"
                    disabled={isLoading}
                    className="absolute top-5 right-[2rem] hover:bg-gray-900  "
                  >
                    <Send className="  text-green-600"></Send>
                  </Button>
                  <div className="absolute top-7 right-[5.5rem]">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
