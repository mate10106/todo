"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center max-w-6xl p-6">
      <div className="text-2xl font-extrabold max-lg:text-4xl max-lg:mx-auto">
        Todo
      </div>
      <div className="hidden lg:flex gap-2 items-center">
        <ul>
          <Link
            href="/dashboard"
            className="text-neutral-600 hover:text-white transition-colors border border-neutral-700 hover:border-neutral-50 p-2 rounded-lg duration-500"
          >
            Home
          </Link>
        </ul>
        <ul>
          <Link
            href="/dashboard/profile"
            className="text-neutral-600 hover:text-white transition-colors border border-neutral-700 hover:border-neutral-50 p-2 rounded-lg duration-500"
          >
            Profile
          </Link>
        </ul>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-neutral-600 text-sm hover:text-white transition-colors border border-neutral-700 hover:border-neutral-50 p-2 rounded-lg duration-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
