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

import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { register } from "@/actions/register";
import { FormSuccess } from "../form-success";
import { RegisterSchema } from "@/schema";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export const RegisterForm = () => {
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
    <CardWrapper
      titleLabel="Create an account"
      headerLabel="Start managing your tasks today"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
      className="w-[500px]"
    >
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
    </CardWrapper>
  );
};
