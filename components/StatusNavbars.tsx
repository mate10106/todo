"use client";

import { AlertCircle, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const StatusNavbar = () => {
  const pathname = usePathname();

  const currentStatus = pathname.split("/").pop();

  const getLinkStyle = (linkStatus: string) => {
    const baseStyle =
      "flex justify-center items-center gap-2 w-[13.4rem] h-12 hover:bg-blue-100/35 dark:bg-gray-800 dark:hover:bg-gray-700/20 dark:border-gray-700 transition-colors duration-500 border-b-2";
    return currentStatus === linkStatus.toLowerCase()
      ? `${baseStyle} bg-blue-100/65 font-semibold border-b-2 border-b-blue-800 dark:bg-blue-800`
      : baseStyle;
  };

  return (
    <section className="mt-12 max-lg:mt-8 max-w-2xl mx-auto">
      <div className="flex justify-center dark:text-white">
        <Link
          href="/dashboard/status/today"
          className={`${getLinkStyle("today")}`}
        >
          <Calendar size={18} />
          Today
        </Link>
        <Link
          href="/dashboard/status/pending"
          className={getLinkStyle("pending")}
        >
          <Clock size={18} />
          Pending
        </Link>
        <Link
          href="/dashboard/status/overdue"
          className={`${getLinkStyle("overdue")}`}
        >
          <AlertCircle size={18} />
          Overdue
        </Link>
      </div>
    </section>
  );
};

export default StatusNavbar;
