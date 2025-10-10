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

    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const supabase = supabaseServerClient(req, res);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return res.status(200).json({ data, message: "Signup successful" });
  } catch (error) {
    handleError(res, error);
  }
}
