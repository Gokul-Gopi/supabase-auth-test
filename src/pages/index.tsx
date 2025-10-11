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
    <div className="px-20">
      <div className="flex justify-between items-center pt-6">
        <h3 className="text-xl">Well look who came crawling back, user!</h3>
        <LoaderButton onClick={onLogout} loading={logout.isPending}>
          <Icon icon="tabler:logout-2" /> Logout
        </LoaderButton>
      </div>
    </div>
  );
};

export default Page;
