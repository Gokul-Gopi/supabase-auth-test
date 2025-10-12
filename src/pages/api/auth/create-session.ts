import { type NextApiRequest, type NextApiResponse } from "next";
import createServerClient from "@/utils/supbaseServerClient";
import { handleError } from "@/utils/server/helpers";

export default async function hadnler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const code = req.body?.code;

    if (code) {
      const supabase = createServerClient(req, res);
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error)
        throw new Error(
          "Something went wrong while exchanging code for session"
        );

      return res.status(201).json({ message: "Session created for user" });
    }

    return res
      .status(400)
      .json({ message: "No code detected. Please try again." });
  } catch (error) {
    handleError(res, error);
  }
}
