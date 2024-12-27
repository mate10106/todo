"use server";

import { db } from "@/lib/db";
import { CreatedTodoSchema } from "@/schema";
import { TodoStatus } from "@prisma/client";
import { z } from "zod";

export const createTodo = async (
  value: z.infer<typeof CreatedTodoSchema>,
  userId: string
) => {
  const validatedFields = CreatedTodoSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, deadline, comments, category, priority } =
    validatedFields.data;

  try {
    const currentDate = new Date();
    const initialStatus =
      new Date(deadline) > currentDate ? "PENDING" : "IN_PROGRESS";

    await db.createdTodo.create({
      data: {
        title,
        deadline,
        comments,
        category,
        priority,
        status: initialStatus,
        user: {
          connect: { id: userId },
        },
      },
    });

    return { success: "Todo is created!" };
  } catch (error) {
    return { error: "Failed to create todo" };
  }
};

export const getTodosByUserId = async (userId: string, status?: TodoStatus) => {
  try {
    const todos = await db.createdTodo.findMany({
      where: {
        userId,
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const updateTodoStatus = async (
  id: string,
  status: TodoStatus,
  completed: boolean
) => {
  try {
    const updatedTodo = await db.createdTodo.update({
      where: { id },
      data: { status, completed },
    });
    return updatedTodo;
  } catch (error) {
    return { error: "Failed to update todo status" };
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const deleteTask = await db.createdTodo.delete({
      where: { id },
    });

    return deleteTask;
  } catch (error) {
    return { error: "Failed to delete todo" };
  }
};

export const getTodoStats = async (userId: string) => {
  try {
    const stats = await db.createdTodo.groupBy({
      by: ["status"],
      where: { userId },
      _count: true,
    });

    const totalTasks = stats.reduce((acc, curr) => acc + curr._count, 0);
    const completed = stats.find((s) => s.status === "COMPLETED")?._count ?? 0;
    const inProgress =
      stats.find((s) => s.status === "IN_PROGRESS")?._count ?? 0;
    const overdue = stats.find((s) => s.status === "OVERDUE")?._count ?? 0;

    return {
      totalTasks,
      completed,
      inProgress,
      overdue,
    };
  } catch (error) {
    console.error("Error fetching todo status:", error);
    return {};
  }
};
