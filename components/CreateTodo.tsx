"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CreateComponentForm } from "./CRUD/create-components";
import { useSession } from "next-auth/react";
import { getTodosByUserId } from "@/actions/todo";

const CreateTodoForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
      const data = await getTodosByUserId(userId);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 mt-20 max-lg:mt-12 m-12">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button variant="secondary" onClick={handleOpenModal}>
          + Add tasks
        </Button>
      </div>
      <div className="min-h-screen border rounded-lg">
        <div className="min-h-screen border m-7 rounded-lg">
          <ul>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border border-[#7c3aed] m-1 rounded-lg h-20 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <input
                      type="checkbox"
                      className="ml-4 rounded-lg size-4 cursor-pointer"
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
                    <span className="">
                      {new Date(todo.deadline).toDateString()}
                    </span>
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
                    <div className="bg-red-800 h-8 w-8 mr-4 rounded-lg" />
                  </div>
                </li>
              ))
            ) : (
              <p className="text-lg font-serif flex justify-center items-center min-h-screen">
                No data to display
              </p>
            )}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black">
            <div className="absolute float-end p-2">
              <button
                className="hover:text-blue-700 transition-colors duration-300"
                onClick={handleCloseModal}
              >
                ✖
              </button>
            </div>
            {userId ? (
              <CreateComponentForm userId={userId} />
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateTodoForm;
