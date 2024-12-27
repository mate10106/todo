import { db } from "@/lib/db";
import cron from "node-cron";

export const updateOverdueTodos = async () => {
  const updateTodos = async () => {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const result = await db.createdTodo.updateMany({
        where: {
          deadline: { lt: currentDate },
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

export const deleteOldTodos = async () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const deletedTodo = await db.createdTodo.deleteMany({
      where: {
        completed: true,
        updatedAt: { lte: oneWeekAgo },
      },
    });

    console.log(`${deletedTodo.count} old todos deleted successfully.`);
  } catch (error) {
    console.error("Error deleting old todos: ", error);
  }

  cron.schedule("0 0 * * *", async () => {
    console.log("Running cleanup job...");
    await deleteOldTodos();
  });
};
