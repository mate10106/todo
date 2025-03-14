"use client";

import Image from "next/image";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/schema";
import { z } from "zod";
import { startTransition, useState, useTransition } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { EditProfileFormContentProps } from "@/types";
import { X } from "lucide-react";

const EditProfileComponents = ({
  closeModal,
  urlError,
}: EditProfileFormContentProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { data: session } = useSession();
  const user = session?.user;

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user?.name || "John Doe",
      email: user?.email || "johndoe@example.com",
      phone: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof EditProfileSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {});
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 p-2 shadow-xl">
          <div className="flex flex-col space-y-12 m-6 dark:text-white">
            <div className="flex items-center justify-between">
              <h1 className="font-bold dark:text-white">Edit profile</h1>
              <Button
                variant="ghost"
                onClick={closeModal}
                className="rounded-lg p-1 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="text-gray-500 dark:text-gray-400" />
              </Button>
            </div>
            <div className="mx-auto">
              <Button className="h-16 rounded-xl" variant="ghost">
                <Image
                  src={user?.image ? user.image : "/person.svg"}
                  width={120}
                  height={120}
                  alt="profile image"
                  className="size-12 rounded-lg bg-cover"
                />
              </Button>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            id="name"
                            type="name"
                            placeholder="name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pointer-events-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            id="profession"
                            type="profession"
                            placeholder="software engineer"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <div className="mt-12 float-end space-x-4">
                  <Button
                    onClick={closeModal}
                    variant="ghost"
                    className="dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600/85 font-bold hover:bg-blue-600 dark:text-white"
                    variant="default"
                    type="submit"
                    disabled={isPending}
                  >
                    Save Changes
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

export default EditProfileComponents;
