import { NextApiResponse } from "next";
import * as z from "zod";

export const handleError = (res: NextApiResponse, error: unknown) => {
  console.log({ error });
  return res.status(500).json({
    message: (error as Error)?.message || "Oh great.. Something went wrong",
  });
};

export const validateBody = <T extends z.ZodTypeAny>(
  schema: T,
  body: unknown
): z.infer<T> => {
  return schema.parse(body);
};
