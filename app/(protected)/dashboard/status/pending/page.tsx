"use client";

import ListCompletedTodoForm from "@/components/ListCompletedTodo";
import ListTasks from "@/components/ListTasks";

import { getTodosByUserId } from "@/actions/todo";
import { Todo } from "@/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const PendingPage = () => {
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
      const data = await getTodosByUserId(userId, "PENDING");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 mt-2 max-lg:mt-12 m-12">
      <div>
        <div className="flex flex-col justify-between m-7 rounded-lg">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="flex w-full max-w-2xl mx-auto">
              {todos.length < 1 ? (
                <p className="mx-auto">No tasks pending</p>
              ) : (
                <ListTasks todos={todos} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PendingPage;
