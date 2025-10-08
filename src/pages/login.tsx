import { ILogin } from "@/utils/types";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<ILogin>();

  const onSubmit = (data: ILogin) => {
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
        <button type="submit">Login</button>
        <Link href="/signup">Create make a new account yo</Link>
      </FormProvider>
    </form>
  );
};

export default Page;
