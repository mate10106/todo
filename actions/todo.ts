"use server";

import { trackActivity } from "@/lib/activities";
import { db } from "@/lib/db";
import { CreatedTodoSchema } from "@/schema";
import { TodoStatus } from "@prisma/client";
import { date, z } from "zod";

export const createTodo = async (
  value: z.infer<typeof CreatedTodoSchema>,
  userId: string
) => {
  const validatedFields = CreatedTodoSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, deadline, comments, category, priority, collaborators } =
    validatedFields.data;

  try {
    const currentDate = new Date();
    const initialStatus =
      new Date(deadline) > currentDate ? "PENDING" : "IN_PROGRESS";

    const todo = await db.createdTodo.create({
      data: {
        title,
        deadline,
        comments,
        category,
        priority,
        collaborators,
        status: initialStatus,
        user: {
          connect: { id: userId },
        },
      },
    });

    await trackActivity(userId, todo.id, todo.title, "CREATED");

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
    const todo = await db.createdTodo.findUnique({
      where: { id },
    });

    if (!todo) {
      return { error: "Todo not found" };
    }

    const updatedTodo = await db.createdTodo.update({
      where: { id },
      data: { status, completed },
    });

    await trackActivity(todo.userId, id, todo.title, "MODIFIED");

    if (completed && !todo.completed) {
      await trackActivity(todo.userId, id, todo.title, "COMPLETED");
    }

    return updatedTodo;
  } catch (error) {
    return { error: "Failed to update todo status" };
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const todo = await db.createdTodo.findUnique({
      where: { id },
    });

    if (!todo) {
      return { error: "Todo not found" };
    }

    const deleteTask = await db.createdTodo.delete({
      where: { id },
    });

    await trackActivity(todo.userId, id, todo.title, "REMOVED");

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
