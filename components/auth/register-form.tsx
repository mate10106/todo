"use client";

import dynamic from "next/dynamic";
import { CardWrapper } from "./card-wrapper";

const RegisterFormContent = dynamic(
  () => import("./RegisterFormContent").then((mod) => mod.RegisterFormContent),
  { ssr: false }
);

export const RegisterForm = () => {
  return (
    <CardWrapper
      titleLabel="Create an account"
      headerLabel="Start managing your tasks today"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <RegisterFormContent />
    </CardWrapper>
  );
};
