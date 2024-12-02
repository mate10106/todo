"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const StatusNavbar = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  console.log(status);

  const getLinkStyle = (linkStatus: string) => {
    const baseStyle = "flex justify-center items-center w-32 border h-10";
    return status === linkStatus
      ? `${baseStyle} bg-blue-500 text-white`
      : baseStyle;
  };

  return (
    <section className="mt-12 max-lg:mt-8">
      <div className="flex justify-center gap-[2px]">
        <Link
          href="/dashboard/status/today"
          className={`${getLinkStyle("today")} rounded-l-md`}
        >
          Today
        </Link>
        <Link
          href="/dashboard/status/pending"
          className={getLinkStyle("pending")}
        >
          Pending
        </Link>
        <Link
          href="/dashboard/status/overdue"
          className={`${getLinkStyle("overdue")} rounded-r-md`}
        >
          Overdue
        </Link>
      </div>
    </section>
  );
};

export default StatusNavbar;