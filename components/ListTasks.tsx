"use client";

import clsx from "clsx";

import { Todo } from "@/types";
import { deleteTodo, updateTodoStatus } from "@/actions/todo";
import {
  Calendar,
  Check,
  Flag,
  MessageSquare,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const ListTasks = ({ todos: initialTodos }: { todos: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const getPriorityColor = (priority: string) => {
    return clsx({
      "text-red-700": priority === "high",
      "text-yellow-500": priority === "medium",
      "text-green-600": priority === "low",
    });
  };

  const handleCheckboxChange = async (id: string, completed: boolean) => {
    await updateTodoStatus(id, "COMPLETED", !completed);

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <ul className="w-full">
      {todos.map((todo, index) => (
        <li
          key={index}
          className="group flex flex-col justify-around m-1 border border-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:mb-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-24"
        >
          <div className="flex justify-between mr-4 mt-2 dark:bg-transparent">
            <div className="flex items-center gap-4 dark:bg-transparent">
              <button
                className={`ml-2 w-6 h-6 dark:bg-transparent rounded-full border-2 dark:border-[3px] flex items-center justify-center transition-colors duration-200
                  ${
                    todo.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 hover:border-green-500 dark:border-gray-500 dark:hover:border-green-500"
                  }`}
                onClick={() => handleCheckboxChange(todo.id, todo.completed)}
              >
                {todo.completed && <Check size={14} className="text-white" />}
              </button>
              <span className="text-lg dark:text-white dark:bg-transparent">
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 dark:bg-transparent text-gray-400 hover:text-red-500 transition-all duration-200"
            >
              <Trash2 size={17} className="dark:bg-transparent" />
            </button>
          </div>
          <div className="flex items-center gap-2 ml-2 text-gray-500 text-sm dark:bg-transparent">
            <Calendar size={16} />
            <span className="max-sm:text-xs dark:bg-transparent">
              {new Date(todo.deadline).toDateString()}
            </span>
            <div className="flex items-center gap-1 dark:bg-transparent">
              <Tag size={14} className="dark:bg-transparent" />
              <span className="dark:bg-transparent">{todo.category}</span>
            </div>
            <div className="dark:bg-transparent">
              {todo.priority && (
                <div
                  className={`flex items-center space-x-1 dark:bg-transparent ${getPriorityColor(
                    todo.priority
                  )}`}
                >
                  <Flag size={14} className="dark:bg-transparent" />
                  <span className="dark:bg-transparent">
                    {todo.priority.toLowerCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListTasks;
