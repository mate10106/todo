import { Home, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const MobileNavbar = () => {
  return (
    <div className="flex items-center justify-center sm:hidden">
      <div className="w-full max-w-lg rounded-2xl">
        <ul className="flex flex-col mx-auto ml-2">
          <li className="flex cursor-pointer gap-4 p-2 text-neutral-600 font-bold text-base hover:bg-slate-500/10 transition-colors  rounded-lg duration-500">
            <Home size={22} />
            <Link href="/dashboard/status/today">Home</Link>
          </li>
          <li className="flex cursor-pointer gap-4 p-2 text-neutral-600 font-bold text-base hover:bg-slate-500/10 transition-colors  rounded-lg duration-500">
            <User size={22} />
            <Link href="/dashboard/profile">Profile</Link>
          </li>
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
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
