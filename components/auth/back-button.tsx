"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { BackButtonProps } from "@/types";

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full text-white"
      size="sm"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
