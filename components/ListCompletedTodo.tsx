"use client";

import { getTodosByUserId } from "@/actions/todo";
import { Todo } from "@/types";
import { TodoStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import clsx from "clsx";
import {
  Calendar,
  Check,
  Flag,
  MessageSquare,
  Tag,
  Trash2,
} from "lucide-react";

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
      setTodos(data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    return clsx({
      "text-red-700": priority === "high",
      "text-yellow-500": priority === "medium",
      "text-green-600": priority === "low",
    });
  };

  return (
    <ul className="w-full">
      {todos.map((completedTodo, index) => (
        <li
          key={index}
          className="group flex flex-col justify-around m-1 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-24"
        >
          <div className="flex justify-between mr-4 mt-2">
            <div className="flex items-center gap-4">
              <button
                className={`ml-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200
              ${
                completedTodo.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 hover:border-green-500"
              }`}
              >
                {completedTodo.completed && (
                  <Check size={14} className="text-white" />
                )}
              </button>
              <span className="text-lg line-through">
                {completedTodo.title}
              </span>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200">
              <Trash2 size={17} />
            </button>
          </div>
          <div className="flex items-center gap-2 ml-2 text-gray-500 text-sm">
            <Calendar size={16} />
            <span>{new Date(completedTodo.deadline).toDateString()}</span>
            <div className="flex items-center gap-1">
              <Tag size={14} />
              <span>{completedTodo.category}</span>
            </div>
            <div>
              {completedTodo.priority && (
                <div
                  className={`flex items-center space-x-1 ${getPriorityColor(
                    completedTodo.priority
                  )}`}
                >
                  <Flag size={14} />
                  <span>{completedTodo.priority.toLowerCase()}</span>
                </div>
              )}
            </div>
            <div>
              {completedTodo.comments && (
                <div className="flex items-center space-x-1">
                  <MessageSquare size={14} />
                  <span>Has notes</span>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListCompletedTodoForm;
