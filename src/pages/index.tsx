import { useLogout } from "@/api/queries/auth";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Post from "@/components/pages/home/Post";
import PostForm from "@/components/pages/home/PostForm";
import { Dialog } from "@/components/ui/Dialog";
import LoaderButton from "@/components/ui/LoaderButton";
import useAuthStore from "@/store/userStore";
import withAuth from "@/utils/client/withAuth";
import { IPostData } from "@/utils/types";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = withAuth(async (_ctx, user) => {
  return {
    props: { user },
  };
});

const Page = () => {
  const router = useRouter();
  const [postToEdit, setPostToEdit] = useState<IPostData | null>();
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>();

  const logout = useLogout();
  const { user } = useAuthStore();

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <div className="px-20">
      <div className="mb-12 flex items-center justify-between pt-6">
        <h3 className="text-xl">Oh great.. its {user?.name}!</h3>
        <LoaderButton onClick={onLogout} loading={logout.isPending}>
          <Icon icon="tabler:logout-2" /> Logout
        </LoaderButton>
      </div>

      <PostForm />

      <hr className="my-8" />

      <h3 className="text-primary mb-8 text-2xl font-bold tracking-wider">
        POSTS
      </h3>

      <div className="grid grid-cols-4 gap-4">
        {[
          {
            id: 1,
            title: "Title",
            content:
              "Lorem ipsum dolor sit amet consectetur adipiscing elit m ipsum dolor sit amet consectetur adipiscing elit",
          },
        ].map((post, i) => (
          <Post
            key={i}
            {...post}
            onEdit={() => setPostToEdit(post)}
            onDelete={() => setPostIdToDelete(post.id)}
          />
        ))}
      </div>

      <Dialog
        open={!!postToEdit}
        onOpenChange={() => setPostToEdit(null)}
        title="Edit post"
      >
        <PostForm formData={postToEdit} />
      </Dialog>

      <ConfirmationDialog
        open={!!postIdToDelete}
        onOpenChange={() => setPostIdToDelete(null)}
        onConfirm={() => setPostIdToDelete(null)}
      />
    </div>
  );
};

export default Page;
