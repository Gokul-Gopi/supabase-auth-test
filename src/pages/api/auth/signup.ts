import { handleError } from "@/utils/server/helpers";
import supabaseServerClient from "@/utils/supbaseServerClient";
import type { NextApiRequest, NextApiResponse } from "next";
import type { SignInWithOAuthCredentials } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ message: "Method not allowed" });

    const provider = req.query?.provider as
      | SignInWithOAuthCredentials["provider"]
      | undefined;

    const supabase = supabaseServerClient(req, res);

    if (provider) {
      const {
        data: { url },
        error,
      } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw new Error(error.message);

      const code = url
        ?.split("?")[1]
        .split("&")
        .find((param) => param.startsWith("code_challenge"))
        ?.split("=")[1];

      if (!code) throw new Error("Code not found");

      const {
        data: { user },
        error: sessionError,
      } = await supabase.auth.exchangeCodeForSession(code);

      console.log({ user });

      if (error) throw new Error(sessionError?.message);

      return res.status(200).json({ message: "Signup successful" });
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, email },
      },
    });

    if (error) throw new Error(error.message);

    return res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    handleError(res, error);
  }
}
