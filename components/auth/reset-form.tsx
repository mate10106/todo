"use client";

import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { startTransition, useState } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { reset } from "@/actions/reset";
import { ListRestart } from "lucide-react";

export const ResetForm = () => {
  const [isPanding, setIsPanding] = useState();
  const [error, setError] = useState<undefined | string>();
  const [success, setSuccess] = useState<undefined | string>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
      titleLabel="Recover Your Account"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
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
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            variant="default"
            disabled={isPanding}
            className="w-full bg-blue-600/85 font-bold hover:bg-blue-600"
          >
            <ListRestart size={28} />
            Send Reset Link
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
