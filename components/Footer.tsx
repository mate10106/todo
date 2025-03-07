import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="text-center py-12">
      <h2 className="font-bold text-3xl">Ready to Get Started?</h2>
      <p className="pt-3 text-black/55 text-[22px] text-wrap">
        Join thousands of users who are already experiencing the power of
        organized productivity.
      </p>
      <div className="mt-12">
        <div className="space-x-4">
          <Link
            href="/auth/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
