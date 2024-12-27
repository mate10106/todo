import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <SessionProvider>
        <Navbar />
      </SessionProvider>
      {children}
    </section>
  );
}
