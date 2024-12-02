"use client";

import { getTodosByUserId } from "@/actions/todo";
import { Todo } from "@/types";
import { TodoStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import clsx from "clsx";

const ListCompletedTodoForm = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      fetchTodos(userId);
    }
  }, [userId]);

  const fetchTodos = async (userId: string, status: string = "COMPLETED") => {
    setIsLoading(true);
    try {
      const data = await getTodosByUserId(userId, status as TodoStatus);
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
    <ul>
      {todos.map((completedTodo, index) => (
        <li
          key={index}
          className="flex items-center justify-between border border-[#7c3aed] m-1 rounded-lg h-20 brightness-50"
        >
          <div className="flex items-center gap-6">
            <input
              type="checkbox"
              className="ml-4 rounded-lg size-4 cursor-pointer"
            />
            <span className="text-lg">{completedTodo.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/clock-three-svgrepo-com.svg"
              height={20}
              width={20}
              alt="clock"
            />
            <span className="">
              {new Date(completedTodo.deadline).toDateString()}
            </span>
          </div>
          <div className="flex gap-8">
            <Button disabled>
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
                getPriorityColor(completedTodo.priority)
              )}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListCompletedTodoForm;
