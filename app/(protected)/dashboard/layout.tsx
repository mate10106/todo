import Navbar from "@/components/Navbar";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-[1100px] mx-auto">
      <Navbar />
      {children}
    </div>
  );
}
