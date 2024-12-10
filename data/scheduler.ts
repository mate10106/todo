import { db } from "@/lib/db";
import cron from "node-cron";

export const updateOverdueTodos = async () => {
  const updateTodos = async () => {
    try {
      const currentTime = new Date();

      const result = await db.createdTodo.updateMany({
        where: {
          deadline: { lt: currentTime },
          status: "IN_PROGRESS",
        },
        data: {
          status: "OVERDUE",
        },
      });

      console.log(`Updated ${result.count} overdue todos`);
    } catch (error) {
      console.error("Error updating overdue todos:", error);
    }
  };

  await updateTodos();

  cron.schedule("0 0 * * *", updateTodos);
};
