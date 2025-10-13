import { useLogout } from "@/api/queries/auth";
import Post from "@/components/pages/home/Post";
import { Input } from "@/components/ui/Input";
import LoaderButton from "@/components/ui/LoaderButton";
import { Textarea } from "@/components/ui/Textarea";
import useAuthStore from "@/store/userStore";
import withAuth from "@/utils/client/withAuth";
import { IPostForm } from "@/utils/types";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

export const getServerSideProps = withAuth(async (_ctx, user) => {
  return {
    props: { user },
  };
});

const Page = () => {
  const router = useRouter();
  const form = useForm<IPostForm>();

  const logout = useLogout();
  const { user } = useAuthStore();

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <div className="px-20">
      <div className="flex items-center justify-between pt-6">
        <h3 className="text-xl">Oh great.. its {user?.name}!</h3>
        <LoaderButton onClick={onLogout} loading={logout.isPending}>
          <Icon icon="tabler:logout-2" /> Logout
        </LoaderButton>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={onSubmit}
          className="mt-12 flex max-w-[20rem] flex-col items-start gap-4"
        >
          <Input placeholder="Title" {...form.register("title")} />
          <Textarea placeholder="Content" {...form.register("content")} />
          <LoaderButton type="submit" className="w-full">
            Create
          </LoaderButton>
        </form>
      </FormProvider>

      <hr className="my-8" />

      <h3 className="text-primary mb-8 text-2xl font-bold tracking-wider">
        POSTS
      </h3>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Post
            key={i}
            id={i}
            title="Title"
            content="Lorem ipsum dolor sit amet consectetur adipiscing elit m ipsum dolor sit amet consectetur adipiscing elit"
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
