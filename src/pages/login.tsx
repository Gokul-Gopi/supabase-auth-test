import { useLogin } from "@/api/queries/auth";
import LoaderButton from "@/components/ui/LoaderButton";
import { Input } from "@/components/ui/Input";
import { ILogin } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import supabase from "@/utils/client/supabase";
import { Icon } from "@iconify/react";

const Page = () => {
  const form = useForm<ILogin>();
  const login = useLogin();
  const router = useRouter();

  const [oAuthLoading, setOAuthLoading] = useState(false);

  const onSubmit = (data: ILogin) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push("/");
        toast.success("Login successful");
      },
    });
  };

  const onOAuthSubmit = async () => {
    setOAuthLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/create-session`,
        // The param was added for testing, since the google consent screen only shows up once for a particular account
        // queryParams: {
        //   prompt: "consent",
        // },
      },
    });
    setOAuthLoading(false);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 min-h-dvh justify-center mx-auto max-w-[20rem]"
    >
      <LoaderButton
        onClick={onOAuthSubmit}
        loading={oAuthLoading}
        type="button"
        variant="secondary"
      >
        <Icon icon="tabler:brand-google-filled" />
        Signup with Google
      </LoaderButton>

      <div className="flex items-center gap-2">
        <hr className="w-full" />
        <span className="text-center text-xs tracking-wider">OR</span>
        <hr className="w-full" />
      </div>

      <FormProvider {...form}>
        <Input
          {...form.register("email")}
          className="border"
          placeholder="Email"
        />
        <Input
          type="password"
          {...form.register("password")}
          className="border"
          placeholder="Password"
        />

        <LoaderButton type="submit" loading={login.isPending}>
          Login
        </LoaderButton>

        <Link href="/signup" className="text-primary text-sm text-center">
          Create a new account yo!
        </Link>
      </FormProvider>
    </form>
  );
};

export default Page;
