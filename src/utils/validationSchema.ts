import * as z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(10, "Content is required"),
});
