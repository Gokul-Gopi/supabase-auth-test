import createServerClient from "@/utils/supbaseServerClient";
import { NextApiRequest, NextApiResponse } from "next";

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  userId: string;
}

const authRoute = (
  handler: (req: AuthenticatedNextApiRequest, res: NextApiResponse) => void,
) => {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    const supabase = createServerClient(req, res);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user)
      return res.status(401).json({ message: "Unauthorized" });

    req.userId = user.id as string;

    return handler(req, res);
  };
};

export default authRoute;
