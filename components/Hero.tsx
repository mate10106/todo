"use client";

import { Button } from "./ui/button";
import { CreateTodoForm } from "./CRUD/create-todo";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Todo } from "@/types";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  return (
    <section className="mt-6">
      <div className="flex justify-center max-w-[1000px] w-full mx-auto">
        <Button
          variant="default"
          className="w-[65%] h-12 rounded-xl bg-blue-600/80 hover:bg-blue-600 transition-colors"
          onClick={handleOpenModal}
        >
          <span className="text-lg font-bold">+ Add New task</span>
        </Button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-2 shadow-xl">
              <div className="float-end">
                <button
                  className="hover:text-blue-700 transition-colors duration-300"
                  onClick={handleCloseModal}
                >
                  ✖
                </button>
              </div>
              {userId ? (
                <div>
                  <CreateTodoForm
                    userId={userId}
                    closeModal={handleCloseModal}
                    onAddTodo={handleAddTodo}
                  />
                </div>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
