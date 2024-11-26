import Image from "next/image";
import Link from "next/link";
import React, { lazy } from "react";

const Hero = () => {
  return (
    <section className="mt-28 max-lg:mt-12">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-12 max-lg:gap-8 w-fit mx-auto">
        <Link
          href="/dashboard/create"
          className="group border border-neutral-700 hover:border-neutral-50 h-60 w-[500px] max-sm:w-[400px] max-sm:mx-auto rounded-lg relative overflow-hidden transition-colors duration-500"
        >
          <Image
            src="/create-svgrepo-com.svg"
            width={120}
            height={120}
            alt="create"
            className="crud-images"
          />
          <div className="crud-text">create</div>
        </Link>
        <Link
          href="/read"
          className="group border border-neutral-700 hover:border-neutral-50 h-60 w-[500px] max-sm:w-[400px] max-sm:mx-auto rounded-lg relative overflow-hidden transition-colors duration-500"
        >
          <Image
            src="/read-svgrepo-com.svg"
            width={120}
            height={120}
            alt="read"
            className="crud-images"
          />
          <div className="crud-text">read</div>
        </Link>
        <Link
          href="/update"
          className="group border border-neutral-700 hover:border-neutral-50 h-60 w-[500px] max-sm:w-[400px] max-sm:mx-auto rounded-lg relative overflow-hidden transition-colors duration-500"
        >
          <Image
            src="/update-alt-2-svgrepo-com.svg"
            width={120}
            height={120}
            alt="read"
            className="crud-images"
          />
          <div className="crud-text">update</div>
        </Link>
        <Link
          href="/delete"
          className="group border border-neutral-700 hover:border-neutral-50 h-60 w-[500px] max-sm:w-[400px] max-sm:mx-auto rounded-lg relative overflow-hidden transition-colors duration-500"
        >
          <Image
            src="/delete-1487-svgrepo-com.svg"
            width={120}
            height={120}
            alt="read"
            className="crud-images"
          />
          <div className="crud-text">delete</div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
