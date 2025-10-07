import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

interface ISignupForm {
  email: string;
  password: string;
}

const Page = () => {
  const form = useForm<ISignupForm>();

  const onSubmit = (data: ISignupForm) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-dvh justify-center items-center"
    >
      <FormProvider {...form}>
        <input type="text" {...form.register("email")} className="border" />
        <input
          type="password"
          {...form.register("password")}
          className="border"
        />
        <button type="submit">Signup</button>
        <Link href="/login">I already have an account bro</Link>
      </FormProvider>
    </form>
  );
};

export default Page;
