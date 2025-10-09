import { useLogout } from "@/api/queries/auth";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/router";

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});

const Page = () => {
  const router = useRouter();
  const logout = useLogout();

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Page;
