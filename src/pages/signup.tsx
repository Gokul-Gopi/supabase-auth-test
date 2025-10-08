import api from "@/api/axios";
import { ISignup } from "@/utils/types";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<ISignup>({
    defaultValues: {
      email: "sbusertestmaxx@yopmail.com",
      password: "password",
      name: "Test User",
    },
  });

  const onSubmit = async (data: ISignup) => {
    try {
      const response = await api.post("/signup", data);
      console.log({ response });

      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
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
