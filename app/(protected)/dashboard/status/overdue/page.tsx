"use client";

import ListCompletedTodoForm from "@/components/ListCompletedTodo";
import ListTasks from "@/components/ListTasks";

import { getTodosByUserId } from "@/actions/todo";
import { Todo } from "@/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const OverduePage = () => {
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
      const data = await getTodosByUserId(userId, "OVERDUE");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 mt-8 max-lg:mt-12 m-12">
      <div className="min-h-screen border rounded-lg">
        <div className="flex flex-col justify-between min-h-screen border m-7 rounded-lg">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <>
              <div>
                <ListTasks todos={todos} />
              </div>
              <div>
                <ListCompletedTodoForm />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OverduePage;
