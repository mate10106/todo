"use client";

import { Button } from "./ui/button";
import { CreateTodoForm } from "./CRUD/create-todo";
import { useSession } from "next-auth/react";
import { useState } from "react";

const StatusNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button variant="secondary" onClick={handleOpenModal}>
          + Add tasks
        </Button>
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
              <CreateTodoForm userId={userId} />
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default StatusNavbar;
