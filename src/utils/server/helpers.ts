import { NextApiResponse } from "next";

export const handleError = (res: NextApiResponse, error: unknown) => {
  console.log({ error });
  return res.status(500).json({
    message: (error as Error)?.message || "Oh great.. Something went wrong",
  });
};
