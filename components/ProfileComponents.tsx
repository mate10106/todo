"use client";

import { useSession } from "next-auth/react";

const ProfileComponents = () => {
  const { data: session } = useSession();

  return (
    <form className="">
      <div className="flex flex-col mx-auto w-[300px] gap-8">
        <div className="flex gap-8 justify-end items-center">
          <label>Name:</label>
          <input
            type="text"
            className="rounded-lg p-2 bg-transparent border border-neutral-700"
            placeholder={session?.user?.name || "Your name"}
            readOnly
          />
        </div>
        <div className="flex gap-8 justify-end items-center">
          <label>Email:</label>
          <input
            type="email"
            className="rounded-lg p-2 bg-transparent border border-neutral-700"
            placeholder={session?.user?.email || "Your email"}
            readOnly
          />
        </div>
        <div className="flex gap-8 justify-center items-center">
          <button className="border p-2 rounded-lg text-sm font-bold">
            Change password
          </button>
          <button className="border p-2 rounded-lg text-sm bg-red-900 font-bold">
            Delete account
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileComponents;
