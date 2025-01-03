"use client";

import * as z from "zod";
import Link from "next/link";

import { useForm } from "react-hook-form";
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
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { register } from "@/actions/register";
import { UserPlus } from "lucide-react";

export const RegisterFormContent = () => {
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSuccess] = useState<string | undefined>("");
  const [isPanding, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className=" text-white">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPanding}
                    placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPanding}
                    type="email"
                    placeholder="john.doe@example.com"
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPanding}
                    type="password"
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={succes} />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            required
            className=" h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label>
            I agree to the{" "}
            <Link
              href="/contract/termsOfService"
              className="text-blue-600 font-bold"
            >
              Terms of Service {""}
            </Link>
            and {""}
            <Link
              href="/contract/privacyPolicy"
              className="text-blue-600 font-bold"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        <Button
          className="w-full bg-blue-600/85 font-bold hover:bg-blue-600"
          type="submit"
          disabled={isPanding}
        >
          <UserPlus size={11} />
          Create account
        </Button>
      </form>
    </Form>
  );
};
