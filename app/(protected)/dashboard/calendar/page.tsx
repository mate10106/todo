import Calendar from "@/components/Calendar";
import { SessionProvider } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <SessionProvider>
      <Calendar />
    </SessionProvider>
  );
};

export default page;
