"use client";

import Image from "next/image";
import Link from "next/link";

import { NavLinkProps } from "@/types";
import { Calendar, Home, List, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const userProfileImage = session?.user?.image
    ? session?.user?.image
    : "/person.svg";

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-600 dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Todo
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                icon={<Home size={20} />}
                text="Home"
                href="/dashboard/status/today"
              />
              <NavLink
                icon={<Calendar size={20} />}
                text="Calender"
                href="/dashboard/calender"
              />
              <NavLink
                icon={<User size={20} />}
                text="Profile"
                href="/dashboard/profile"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 max-sm:hidden">
            <ThemeToggle />
            <Link href="/dashboard/profile">
              <Image
                src={userProfileImage}
                width={26}
                height={26}
                alt="profileImage"
                className="rounded-full size-8"
              />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-neutral-600 dark:text-white font-bold text-base hover:bg-slate-500/10 transition-colors p-2 rounded-lg duration-500"
            >
              <Image
                src="/exit-svgrepo-com.svg"
                width={24}
                height={24}
                alt="logout"
              />
              Logout
            </button>
          </div>
          <div className="flex items-center space-x-2 sm:hidden">
            <ThemeToggle />
            <Button
              variant="outline"
              onClick={handleToggleModal}
              className="dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors duration-200"
            >
              {isModalOpen ? (
                <X
                  size={22}
                  className="dark:text-white dark:hover:text-gray-400"
                />
              ) : (
                <List
                  size={22}
                  className="dark:text-white dark:hover:text-gray-400"
                />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && <MobileNavbar onNavigate={handleToggleModal} />}
    </nav>
  );
};

function NavLink({ icon, text, href }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-4 transition-colors duration-200 space-x-2
        ${
          isActive
            ? "border-blue-500 text-gray-900 dark:text-white"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-white/60 dark:hover:text-white"
        }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export default Navbar;
