"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { getTodosByUserId } from "@/actions/todo";
import clsx from "clsx";

const ListTodayTodo = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      fetchTodos(userId);
    }
  }, [userId]);

  const fetchTodos = async (userId: string) => {
    setIsLoading(true);
    try {
      const data = await getTodosByUserId(userId);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    return clsx({
      "bg-red-700": priority === "high",
      "bg-yellow-500": priority === "medium",
      "bg-green-600": priority === "low",
    });
  };

  return (
    <section className="flex flex-col gap-6 mt-8 max-lg:mt-12 m-12">
      <div className="min-h-screen border rounded-lg">
        <div className="min-h-screen border m-7 rounded-lg">
          <ul>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border border-[#7c3aed] m-1 rounded-lg h-20 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <input
                      type="checkbox"
                      className="ml-4 rounded-lg size-4 cursor-pointer"
                    />
                    <span className="text-lg">{todo.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/clock-three-svgrepo-com.svg"
                      height={20}
                      width={20}
                      alt="clock"
                    />
                    <span className="">
                      {new Date(todo.deadline).toDateString()}
                    </span>
                  </div>
                  <div className="flex gap-8">
                    <Button>
                      <Image
                        src="/pen-svgrepo-com.svg"
                        height={20}
                        width={20}
                        alt="pen"
                      ></Image>
                    </Button>
                    <div
                      className={clsx(
                        "-8 w-8 mr-4 rounded-lg",
                        getPriorityColor(todo.priority)
                      )}
                    />
                  </div>
                </li>
              ))
            ) : (
              <p className="text-lg font-serif flex justify-center items-center min-h-screen">
                No data to display
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ListTodayTodo;
