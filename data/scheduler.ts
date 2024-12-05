import { db } from "@/lib/db";
import cron from "node-cron";

export const updateOverdueTodos = async () => {
  // Execute immediately and then schedule
  const updateTodos = async () => {
    try {
      const currentTime = new Date();
      console.log("Running overdue check at:", currentTime);

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

  // Run immediately when server starts
  await updateTodos();

  // Schedule for future runs
  cron.schedule("0 0 * * *", updateTodos);
};
