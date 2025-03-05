"use server";

import { db } from "@/lib/db";

export async function getUserActivities(userId: string, limit = 5) {
  try {
    const activities = await db.activity.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    return activities;
  } catch (error) {
    console.error("Error fetching user activities:", error);
    return [];
  }
}
