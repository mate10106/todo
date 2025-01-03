import { db } from "@/lib/db";

export const deleteUser = async (id: string) => {
  try {
    const deleteUser = await db.user.delete({
      where: { id },
    });

    return deleteUser;
  } catch (error) {
    return { error: "Failed to delete user." };
  }
};

export const updateUser = async () => {};
