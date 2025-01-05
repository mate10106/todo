"use client";

import ListCompletedTodoForm from "@/components/ListCompletedTodo";
import ListTasks from "@/components/ListTasks";

import { getTodosByUserId } from "@/actions/todo";
import { Todo } from "@/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const TodayPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      const data = await getTodosByUserId(userId, "IN_PROGRESS");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col mt-2 m-2">
      <div>
        <div className="flex flex-col justify-between m-7 rounded-lg">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="flex flex-col justify-between h-[63svh] w-full max-w-2xl mx-auto">
              {todos.length < 1 ? (
                <p className="mx-auto">No tasks today</p>
              ) : (
                <ListTasks todos={todos} />
              )}
              <ListCompletedTodoForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TodayPage;
