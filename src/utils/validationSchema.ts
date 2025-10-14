import * as z from "zod";

export const createPostSchema = z.object({
  title: z.string("Title is required"),
  content: z.string("Content is required").min(10, "Minimum 10 chracters"),
});

export const signupSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string("Password is reqired")
    .min(8, "Password must be at least 8 characters"),
  name: z.string("Name is required"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string("Password is required"),
});
