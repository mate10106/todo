import { CheckCircle2, ListTodo } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <nav className="border-b border-gray-100 bg-white/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <ListTodo className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-semibold text-gray-900">Tasks</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 py-24">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Stay Organized,{" "}
                <span className="text-blue-500">Simplify Your Life</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Join now to manage your tasks effortlessly and achieve more
                every day.
              </p>
              <div className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
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
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <div className="p-8">
                    <div className="space-y-4">
                      {[
                        "Intuitive task management",
                        "Smart reminders",
                        "Progress tracking",
                        "Seamless collaboration",
                      ].map((feature, index) => (
                        <div
                          key={index}
                          font-bold
                          text-3xl
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle2 className="h-5 w-5 text-blue-500" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-12">
            <h2 className="font-bold text-3xl">Why Choose Our Task Manager?</h2>
            <p className="pt-3 text-black/55 text-[22px]">
              Discover the features that make our platform stand out
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
