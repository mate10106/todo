import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please eneter a valid email." }).trim(),
  password: z
    .string()
    .min(8, {
      message: "Be at least 8 characters long.",
    })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at lest one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 character required",
  }),
});

export const CreatedTodoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is requied!",
    })
    .max(25, {
      message: "Title must be 25 characters or fewer",
    }),
  deadline: z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: "Deadline must be today or a future date",
    }
  ),
  comments: z
    .string()
    .min(1, { message: "Description is required" })
    .max(150, { message: "Description must be 150 characters or fewer" }),
  category: z.string().optional(),
  priority: z.string(),
});
