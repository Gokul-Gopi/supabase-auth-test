import { useLogout } from "@/api/queries/auth";
import LoaderButton from "@/components/ui/LoaderButton";
import withAuth from "@/utils/client/withAuth";
import { Icon } from "@iconify/react";
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
      <LoaderButton onClick={onLogout} loading={logout.isPending}>
        <Icon icon="tabler:logout-2" /> Logout
      </LoaderButton>
    </div>
  );
};

export default Page;
