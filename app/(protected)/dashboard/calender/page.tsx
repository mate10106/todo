import Calendar from "@/components/Calender";
import { SessionProvider } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <SessionProvider>
      <Calendar />;
    </SessionProvider>
  );
};

export default page;
