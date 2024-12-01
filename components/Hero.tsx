import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="mt-12 max-lg:mt-8">
      <div className="flex justify-center gap-[2px]">
        <Link
          href="/dashboard/status/today"
          className="flex justify-center items-center w-32 border h-10 rounded-l-md"
        >
          Today
        </Link>
        <Link
          href="/dashboard/status/pending"
          className="flex justify-center items-center w-32 border h-10"
        >
          Pending
        </Link>
        <Link
          href="/dashboard/status/overdue"
          className="flex justify-center items-center w-32 border h-10 rounded-r-md"
        >
          Overdue
        </Link>
      </div>
    </section>
  );
};

export default Hero;
