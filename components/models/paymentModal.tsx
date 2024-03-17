"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { useModal } from "@/hooks/use-model-store";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UserAvatar } from "../user-avatar";

const formSchema = z.object({
  amount: z.string().min(1, { message: "Music name is required" }),
});

export const PaymentModel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen, type, setAiAskResult, aiAskResult, data } =
    useModal();
  const isModelOpen = isOpen && type === "payment";
  const { me, other } = data;
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent
          className={cn(
            "bg-white text-black pb-6 overflow-hidden flex flex-col",
            aiAskResult && "w-[800px] h-[500px] "
          )}
        >
          <div className=" ">
            <DialogHeader className="pt-8 px-6 w-full h-[350px]">
              <DialogTitle className="text-2xl text-center font-bold">
                Send Money
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500 flex flex-col">
                <p>Metamass wallet is used for transaction....</p>
                <div>
                  <div className="flex items-center  mt-9 ">
                    <div className="basis-1/5  ">
                      <UserAvatar
                        src={me?.imageUrl}
                        className="h-[70px] w-[70px] md:h-[80px] md:w-[80px]"
                      />
                      <p className="flex justify-center items-center  text-xs">
                        {me?.name}
                      </p>
                    </div>
                    <span className="text-xl basis-3/5 w-full flex justify-center">
                      {">>>>>>>> "}
                      <span className="font-semibold text-2xl text-green-400">
                        ₹{" "}
                      </span>
                      {" >>>>>>>"}
                    </span>
                    <div className="basis-1/5  ">
                      <UserAvatar
                        src={other?.imageUrl}
                        className="h-[70px] w-[70px] md:h-[80px] md:w-[80px]"
                      />
                      <p className="flex justify-center items-center  text-xs">
                        {other?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 "
              >
                <div className="space-y-8  px-6 flex justify-between items-center">
                  <div className="basis-4/5 ">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                            Amount
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                              placeholder="Enter Amount ₹"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    className="ml-auto basis-1/5 text-black dark:text-white font-semibold"
                    variant="primary"
                    disabled={isLoading}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
