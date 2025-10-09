import { useLogout } from "@/api/queries/auth";
import { useRouter } from "next/router";

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
