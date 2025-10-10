import { handleError } from "@/utils/server/helpers";
import supabaseServerClient from "@/utils/supbaseServerClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ message: "Method not allowed" });

    const supabase = supabaseServerClient(req, res);

    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    handleError(res, error);
  }
}
