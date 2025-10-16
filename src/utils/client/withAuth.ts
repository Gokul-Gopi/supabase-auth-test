import { GetServerSideProps, type GetServerSidePropsContext } from "next";
import { IUser } from "../types";
import createClient from "../supbaseServerClient";

const withAuth = (
  handler: (
    context: GetServerSidePropsContext,
    user: IUser | null,
  ) => ReturnType<GetServerSideProps>,
) => {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const supabase = createClient(ctx);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      return handler(ctx, { id: user.id, ...user.user_metadata } as IUser);
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
