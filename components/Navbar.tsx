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

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const userProfileImage = session?.user?.image
    ? session?.user?.image
    : "/person.svg";

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-semibold text-gray-800">Todo</span>
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
              className="flex items-center gap-2 text-neutral-600 font-bold text-base hover:bg-slate-500/10 transition-colors p-2 rounded-lg duration-500"
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
          <div className="flex items-center sm:hidden">
            <Button variant="outline" onClick={handleToggleModal}>
              {isModalOpen ? <X size={22} /> : <List size={22} />}
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
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 space-x-2
        ${
          isActive
            ? "border-blue-500 text-gray-900"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export default Navbar;
