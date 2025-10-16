import { handleError, validateBody } from "@/utils/server/helpers";
import supabaseServerClient from "@/utils/supbaseServerClient";
import { signupSchema } from "@/utils/validationSchema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ message: "Method not allowed" });

    const { email, password, name } = validateBody(signupSchema, req.body);

    const supabase = supabaseServerClient(req, res);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, email },
      },
    });

    if (error) throw new Error(error.message);

    return res
      .status(200)
      .json({ data: data.user, message: "Signup successful" });
  } catch (error) {
    handleError(res, error);
  }
}
