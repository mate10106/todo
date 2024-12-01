"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { getTodosByUserId, updateTodoStatus } from "@/actions/todo";
import clsx from "clsx";
import { TodoStatus } from "@prisma/client";
import { Todo } from "@/types";

const ListTodayTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      fetchTodos(userId);
    }
  }, [userId]);

  const fetchTodos = async (userId: string, status: string = "IN_PROGRESS") => {
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

  const handleCheckboxChange = async (id: string) => {
    await updateTodoStatus(id, "COMPLETED");
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li
          key={index}
          className="flex items-center justify-between border border-[#7c3aed] m-1 rounded-lg h-20 cursor-pointer"
        >
          <div className="flex items-center gap-6">
            <input
              type="checkbox"
              className="ml-4 rounded-lg size-4 cursor-pointer"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo.id)}
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
            <span className="">{new Date(todo.deadline).toDateString()}</span>
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
      ))}
    </ul>
  );
};

export default ListTodayTodo;
