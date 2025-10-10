import { GetServerSideProps, type GetServerSidePropsContext } from "next";
import { createServerClient, serializeCookieHeader } from "@supabase/ssr";
import { IUser } from "../types";

const createClient = ({ req, res }: GetServerSidePropsContext) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name] || "",
          }));
        },
        setAll(cookiesToSet) {
          res.setHeader(
            "Set-Cookie",
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );

  return supabase;
};

const withAuth = (
  handler: (
    context: GetServerSidePropsContext,
    user: IUser | null
  ) => ReturnType<GetServerSideProps>
) => {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const supabase = createClient(ctx);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("Authenticated user:", user);

      if (!user) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      return handler(ctx, user.user_metadata as IUser);
    } catch {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  };
};

export default withAuth;
