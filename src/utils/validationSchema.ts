import * as z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(10, "Content is required"),
});

export const signupSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(9, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
});
