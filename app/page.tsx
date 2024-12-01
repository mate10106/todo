import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen items-center border border-[#7c3aed] rounded-xl">
      <div className="relative rounded-full spin-border w-max">
        <div className="z-50">
          <h1 className="text-4xl font-bold font-serif text-center p-8">
            Welcome!
          </h1>
          <h1 className="text-2xl font-bold font-serif mb-24 text-center">
            Sign In <span>&</span> Start Exploring
          </h1>
          <div className="flex gap-6 items-center justify-center">
            <Link
              href="/auth/login"
              className="border-2 md:border-white/30 w-28 text-center md:text-white/30 p-3 rounded-xl uppercase font-bold md:scale-95 md:hover:scale-105 hover:text-white hover:border-white transition-all ease-in-out duration-500"
            >
              Login
            </Link>
            <span className="text-2xl">/</span>
            <Link
              href="/auth/register"
              className="border-2 md:border-white/30 md:text-white/30 p-3 rounded-xl uppercase font-bold md:scale-95 md:hover:scale-105 md:hover:text-white hover:border-white transition-all ease-in-out duration-500"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
