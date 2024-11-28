"use server";

import { db } from "@/lib/db";
import { CreatedTodoSchema } from "@/schema";
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
    await db.createdTodo.create({
      data: {
        title,
        deadline,
        comments,
        category,
        priority,
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

export const getTodosByUserId = async (userId: string) => {
  try {
    const todos = await db.createdTodo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};
