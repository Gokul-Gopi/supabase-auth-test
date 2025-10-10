import { useSignup } from "@/api/queries/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
      className="flex flex-col gap-4 h-dvh justify-center mx-auto max-w-[20rem]"
    >
      <FormProvider {...form}>
        <Input
          {...form.register("email")}
          className="border"
          placeholder="Email"
        />
        <Input
          {...form.register("name")}
          className="border"
          placeholder="Name"
        />
        <Input
          {...form.register("password")}
          type="password"
          className="border"
          placeholder="Password"
        />
        <Button type="submit">Signup</Button>
        <Link href="/login" className="text-primary text-sm text-center">
          I already have an account bro
        </Link>
      </FormProvider>
    </form>
  );
};

export default Page;
