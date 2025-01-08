import { Home, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const MobileNavbar = ({ onNavigate }: { onNavigate: () => void }) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex items-center justify-center sm:hidden">
      <div className="w-full max-w-lg rounded-2xl">
        <div className="flex flex-col mx-auto ml-2">
          <Link
            href="/dashboard/status/today"
            onClick={onNavigate}
            className={`flex cursor-pointer gap-4 p-2 font-bold text-base hover:bg-slate-500/10 transition-colors rounded-lg duration-500 ${
              isActive("/dashboard/status/today")
                ? "text-blue-600 bg-blue-50"
                : "text-neutral-600"
            }`}
          >
            <Home size={22} />
            Home
          </Link>
          <Link
            href="/dashboard/profile"
            onClick={onNavigate}
            className={`flex cursor-pointer gap-4 p-2 font-bold text-base hover:bg-slate-500/10 transition-colors rounded-lg duration-500 ${
              isActive("/dashboard/profile")
                ? "text-blue-600 bg-blue-50"
                : "text-neutral-600"
            }`}
          >
            <User size={22} />
            Profile
          </Link>
          <li className="flex cursor-pointer">
            <button
              className="flex items-center w-full gap-4 p-2 text-neutral-600 font-bold text-base hover:bg-slate-500/10 transition-colors  rounded-lg duration-500"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <Image
                src="/exit-svgrepo-com.svg"
                width={24}
                height={24}
                alt="logout"
              />
              Logout
            </button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
