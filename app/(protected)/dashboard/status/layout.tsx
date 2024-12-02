import Hero from "@/components/Hero";
import StatusNavbar from "@/components/StatusNavbars";
import { SessionProvider } from "next-auth/react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-[1100px] mx-auto">
      <StatusNavbar />
      <SessionProvider>
        <Hero />
        {children}
      </SessionProvider>
    </div>
  );
}
