import { deleteOldTodos, updateOverdueTodos } from "@/data/scheduler";

if (process.env.NODE_ENV !== "production") {
  updateOverdueTodos();
  deleteOldTodos();
}
