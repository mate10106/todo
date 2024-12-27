"use client";

import { ListTodo } from "lucide-react";
import Link from "next/link";

const LogoNav = () => {
  return (
    <nav className="border-b border-gray-100 bg-white/50 backdrop-blur-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ListTodo className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-semibold text-gray-900">Tasks</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LogoNav;
