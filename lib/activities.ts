import { ActivityType } from "@prisma/client";

export async function trackActivity(
  userId: string,
  todoId: string,
  todoTitle: string,
  action: ActivityType
) {
  return prisma?.activity.create({
    data: {
      userId,
      todoId,
      todoTitle,
      action,
    },
  });
}
