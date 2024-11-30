import Hero from "@/components/Hero";
import ListTodayTodo from "@/components/ListTodayTodo";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-[1100px] mx-auto">
        <Hero />
        <SessionProvider>
          <ListTodayTodo />
        </SessionProvider>
      </main>
    </div>
  );
};

export default page;
