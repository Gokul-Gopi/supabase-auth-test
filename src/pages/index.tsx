import { useLogout } from "@/api/queries/auth";
import LoaderButton from "@/components/ui/LoaderButton";
import useAuthStore from "@/store/userStore";
import withAuth from "@/utils/client/withAuth";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

export const getServerSideProps = withAuth(async (_ctx, user) => {
  return {
    props: { user },
  };
});

const Page = () => {
  const router = useRouter();
  const logout = useLogout();

  const { user } = useAuthStore();

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <div className="px-20">
      <div className="flex justify-between items-center pt-6">
        <h3 className="text-xl">Oh great.. its {user?.name}!</h3>
        <LoaderButton onClick={onLogout} loading={logout.isPending}>
          <Icon icon="tabler:logout-2" /> Logout
        </LoaderButton>
      </div>
    </div>
  );
};

export default Page;
