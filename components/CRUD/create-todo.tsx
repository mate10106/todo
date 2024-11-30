"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { createTodo } from "@/actions/todo";
import { FormSuccess } from "../form-success";
import { CreatedTodoSchema } from "@/schema";
import { CardWrapper } from "../auth/card-wrapper";
import { ComboboxDemo } from "../Combobox";

export const CreateTodoForm = ({ userId }: { userId: string }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreatedTodoSchema>>({
    resolver: zodResolver(CreatedTodoSchema),
    defaultValues: {
      title: "",
      deadline: new Date(),
      comments: "",
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreatedTodoSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createTodo(values, userId)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSuccess(data.success);
          }
        })
        .catch((err) => setError("An unexpected error occurred."));
    });
  };

  return (
    <CardWrapper
      headerLabel="Create a new Todo"
      backButtonLabel="Back to Dashboard"
      backButtonHref="/dashboard"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 text-white">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter todo title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <ComboboxDemo
                      value={field.value}
                      disabled={isPending}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            className="w-full bg-[#d66b2b] hover:bg-[#191635] duration-300 text-lg"
            type="submit"
            disabled={isPending}
          >
            Create Todo
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
