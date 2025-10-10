import { useLogin } from "@/api/queries/auth";
import { Button } from "@/components/ui/button";
import { ILogin } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Page = () => {
  const form = useForm<ILogin>();
  const login = useLogin();
  const router = useRouter();

  const onSubmit = async (data: ILogin) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push("/");
        toast.success("Login successful");
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 min-h-dvh justify-center items-center"
    >
      <FormProvider {...form}>
        <input type="text" {...form.register("email")} className="border" />
        <input
          type="password"
          {...form.register("password")}
          className="border"
        />
        <Button type="submit">Login</Button>
        <Link href="/signup">Create a new account yo!</Link>
      </FormProvider>
    </form>
  );
};

export default Page;
