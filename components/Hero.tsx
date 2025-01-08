"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Todo } from "@/types";
import { CreateTaskForm } from "./CreateTask";

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
    const event = new CustomEvent("todoCreated", { detail: newTodo });
    window.dispatchEvent(event);
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
      {userId && (
        <>
          {isModalOpen && (
            <CreateTaskForm
              userId={userId}
              closeModal={handleCloseModal}
              onAddTodo={handleAddTodo}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Hero;
