"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import dynamic from "next/dynamic";

const LoginFormContent = dynamic(
  () => import("./LoginFormContent").then((mod) => mod.LoginFormContent),
  { ssr: false }
);

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already registered with another account"
      : undefined;

  const token = searchParams.get("token") || null;

  return (
    <CardWrapper
      titleLabel="Welcome back"
      headerLabel="Enter your credentials to access your account"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <LoginFormContent token={token} urlError={urlError} />
    </CardWrapper>
  );
};
