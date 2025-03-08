"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  monthNames,
  nextMonth,
  previousMonth,
  weekDays,
} from "@/data/calender";
import { Todo } from "@/types";

export default function Calendar({ todos: initialTodos }: { todos: Todo[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const getDayTasks = (day: number) => {
    return todos.filter((todo) => {
      if (!todo.deadline) return false;
      const todoDate = new Date(todo.deadline);
      return (
        todoDate.getDate() === day &&
        todoDate.getMonth() === currentDate.getMonth() &&
        todoDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-32 border-t border-r border-gray-200 dark:border-gray-700"
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = getDayTasks(day);
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`h-32 border-t border-r border-gray-200 dark:border-gray-700 p-2 ${
            isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <span
              className={`text-sm font-medium ${
                isToday
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {day}
            </span>
            {dayTasks.length > 0 && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                {dayTasks.length}
              </span>
            )}
          </div>
          <div className="mt-2 space-y-1">
            {dayTasks.slice(0, 3).map((task, index) => (
              <div
                key={task.id}
                className="text-xs p-1 rounded bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="truncate text-gray-700 dark:text-gray-300">
                  {task.title}
                </div>
              </div>
            ))}
            {dayTasks.length > 3 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{dayTasks.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => previousMonth(currentDate, setCurrentDate)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => nextMonth(currentDate, setCurrentDate)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-7 mb-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 border-l border-b border-gray-200 dark:border-gray-700">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
}
