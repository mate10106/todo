"use client";

import { AlertCircle, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const StatusNavbar = () => {
  const pathname = usePathname();
  const currentStatus = pathname.split("/").pop();

  const getNavItemStyle = (status: string) => {
    const isActive = currentStatus === status.toLowerCase();
    const isUrgent = status.toLowerCase() === "overdue";
    const isPending = status.toLowerCase() === "pending";
    const isToday = status.toLowerCase() === "today";

    let textColorClass = "text-gray-600 dark:text-gray-300";

    if (isToday) {
      textColorClass = "text-blue-600 dark:text-blue-400";
    } else if (isPending) {
      textColorClass = "text-yellow-600 dark:text-yellow-400";
    } else if (isUrgent) {
      textColorClass = "text-red-600 dark:text-red-400";
    }

    return `flex-1 px-4 py-3 flex items-center justify-center space-x-2 border-b-2 transition-all duration-200
      ${
        isActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/20"
      }
      ${textColorClass}`;
  };

  return (
    <section className="mb-8 mt-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex">
          <Link
            href="/dashboard/status/today"
            className={getNavItemStyle("today")}
          >
            <Calendar size={18} />
            <span className="font-medium dark:bg-transparent">Today</span>
          </Link>

          <Link
            href="/dashboard/status/pending"
            className={getNavItemStyle("pending")}
          >
            <Clock size={18} />
            <span className="font-medium dark:bg-transparent">Pending</span>
          </Link>

          <Link
            href="/dashboard/status/overdue"
            className={getNavItemStyle("overdue")}
          >
            <AlertCircle size={18} />
            <span className="font-medium dark:bg-transparent">Overdue</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatusNavbar;
