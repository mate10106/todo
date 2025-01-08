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

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError } from "./form-error";
import { createTodo } from "@/actions/todo";
import { FormSuccess } from "./form-success";
import { CreatedTodoSchema } from "@/schema";
import { ComboboxDemo } from "./Combobox";
import { Todo } from "@/types";

export const CreateTaskForm = ({
  userId,
  closeModal,
  onAddTodo,
}: {
  userId: string;
  closeModal: () => void;
  onAddTodo: (newTodo: Todo) => void;
}) => {
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
            onAddTodo(data);
            setTimeout(() => closeModal(), 3000);
          }
        })
        .catch((err) => setError("An unexpected error occurred."));
    });
  };

  const priorityData = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const categoryData = [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 z-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        <div className="relative w-full max-w-lg rounded-2xl bg-white p-2 shadow-xl">
          <div className="flex flex-col space-y-12 m-6">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">Create task</h1>
              <Button variant="ghost" onClick={closeModal} className="">
                X
              </Button>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
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
                            className="h-11 rounded-xl"
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
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                            className="block w-full rounded-lg border border-gray-300 pl-2 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                          <ComboboxDemo
                            value={field.value}
                            disabled={isPending}
                            onChange={field.onChange}
                            data={categoryData}
                            title="Select category"
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
                            data={priorityData}
                            title="Select priority"
                          />
                        </FormControl>
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
                          <textarea
                            {...field}
                            disabled={isPending}
                            placeholder="Enter description"
                            rows={3}
                            className="block w-full rounded-lg border border-gray-300 pl-2 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="flex w-full gap-2 justify-end">
                  <Button onClick={closeModal} variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600/80 hover:bg-blue-600 transition-colors"
                    type="submit"
                    disabled={isPending}
                  >
                    Create Task
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
