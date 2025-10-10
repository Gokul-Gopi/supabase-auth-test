import { useSignup } from "@/api/queries/auth";
import { ISignup } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Page = () => {
  const form = useForm<ISignup>();
  const signup = useSignup();
  const router = useRouter();

  const onSubmit = async (data: ISignup) => {
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
      className="flex flex-col gap-4 h-dvh justify-center items-center"
    >
      <FormProvider {...form}>
        <input type="text" {...form.register("email")} className="border" />
        <input type="name" {...form.register("name")} className="border" />
        <input {...form.register("password")} className="border" />
        <button type="submit">Signup</button>
        <Link href="/login">I already have an account bro</Link>
      </FormProvider>
    </form>
  );
};

export default Page;
