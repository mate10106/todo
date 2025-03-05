import { db } from "@/lib/db";

export async function getUserActivities(userId: string, limit = 5) {
  return db.activity.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: limit,
  });
}
