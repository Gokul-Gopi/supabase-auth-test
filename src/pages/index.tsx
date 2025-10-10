import { useLogout } from "@/api/queries/auth";
import { Button } from "@/components/ui/button";
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
      <Button onClick={onLogout}>
        <Icon icon="tabler:logout-2" /> Logout
      </Button>
    </div>
  );
};

export default Page;
