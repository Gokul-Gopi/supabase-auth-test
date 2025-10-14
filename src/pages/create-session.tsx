import { useCreateSession } from "@/api/queries/auth.queries";
import Loader from "@/components/ui/Loader";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const getServerSideProps = ({ query }: GetServerSidePropsContext) => {
  const code = query?.code;

  if (!code) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Page = () => {
  const router = useRouter();
  const createSession = useCreateSession();

  useEffect(() => {
    createSession.mutate(router.query.code as string, {
      onSuccess: () => {
        router.push("/");
        toast.success("Successfully logged in!");
      },
      onError: () => {
        router.push("/login");
        toast.error(
          "We are really sorry. We could not log you in. Please try again or try using other methods",
          { duration: 10000 },
        );
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <Loader className="size-10" />
      <p className="mt-2 text-lg font-medium">
        Just a moment.{" "}
        <span className="text-primary">Almost done logging you in!</span>
      </p>
    </div>
  );
};

export default Page;
