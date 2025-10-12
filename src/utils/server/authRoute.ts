import createServerClient from "@/utils/supbaseServerClient";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../types";

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: IUser;
}

const authRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    const supabase = createServerClient(req, res);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user)
      return res.status(401).json({ message: "Unauthorized" });

    req.user = user.user_metadata as IUser;

    return handler(req, res);
  };
};

export default authRoute;
