import { useSignup } from "@/api/queries/auth.queries";
import ControlledPasswordInput from "@/components/form/ControlledPasswordInput";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import LoaderButton from "@/components/ui/LoaderButton";
import supabase from "@/utils/client/supabase";
import { ISignup } from "@/utils/types";
import { signupSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Page = () => {
  const form = useForm<ISignup>({
    resolver: zodResolver(signupSchema),
  });
  const signup = useSignup();
  const router = useRouter();

  const [oAuthLoading, setOAuthLoading] = useState(false);

  const onOAuthSubmit = async () => {
    setOAuthLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/create-session`,
        // The param was added for testing
        // since the google consent screen only
        // shows up once for an account
        //
        // queryParams: {
        //   prompt: "consent",
        // },
      },
    });
    setOAuthLoading(false);
  };

  const onSubmit = (data: ISignup) => {
    signup.mutate(data, {
      onSuccess: () => {
        router.push("/");
        toast.success("Welcome bro!");
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto flex h-dvh max-w-[20rem] flex-col justify-center gap-4"
    >
      <LoaderButton
        onClick={onOAuthSubmit}
        loading={oAuthLoading}
        type="button"
        variant="secondary"
      >
        <Icon icon="tabler:brand-google-filled" />
        Login with Google
      </LoaderButton>

      <div className="flex items-center gap-2">
        <hr className="w-full" />
        <span className="text-center text-xs tracking-wider">OR</span>
        <hr className="w-full" />
      </div>

      <FormProvider {...form}>
        <ControlledTextInput name="email" placeholder="Email" />
        <ControlledTextInput name="name" placeholder="Name" />
        <ControlledPasswordInput name="password" placeholder="Password" />

        <LoaderButton type="submit" loading={signup.isPending}>
          Signup
        </LoaderButton>

        <Link href="/login" className="text-primary text-center text-sm">
          I already have an account bro
        </Link>
      </FormProvider>
    </form>
  );
};

export default Page;
