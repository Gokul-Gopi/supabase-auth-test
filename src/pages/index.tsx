import api from "@/api/axios";
import { useLogout } from "@/api/queries/auth.queries";
import { useDeletePost, usePosts } from "@/api/queries/post.queries";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Post from "@/components/pages/home/Post";
import PostForm from "@/components/pages/home/PostForm";
import { Dialog } from "@/components/ui/Dialog";
import Loader from "@/components/ui/Loader";
import LoaderButton from "@/components/ui/LoaderButton";
import useAuthStore from "@/store/userStore";
import withAuth from "@/utils/client/withAuth";
import { IPostData } from "@/utils/types";
import { Icon } from "@iconify/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export const getServerSideProps = withAuth(async (ctx, user) => {
  const queryClient = new QueryClient();
  const cookie = ctx.req.headers.cookie;

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await api.get("/post", {
        headers: {
          Cookie: cookie,
        },
        withCredentials: true,
      });

      return res.data;
    },
  });

  return {
    props: { user, dehydratedState: dehydrate(queryClient) },
  };
});

const Page = () => {
  const router = useRouter();
  const [postToEdit, setPostToEdit] = useState<IPostData | null>();
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>();

  const { user } = useAuthStore();

  const logout = useLogout();
  const posts = usePosts();
  const deletePost = useDeletePost();

  const onDelete = (id: number) => {
    deletePost.mutate(id, {
      onSuccess: () => {
        toast.success("Post deleted");
        setPostIdToDelete(null);
      },
    });
  };

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

      {posts.isPending ? (
        <div className="flex w-full justify-center">
          <Loader className="size-6" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {posts?.data?.data?.map((post) => (
            <Post
              key={post.id}
              {...post}
              onEdit={() => setPostToEdit(post)}
              onDelete={() => setPostIdToDelete(post.id)}
            />
          ))}
        </div>
      )}

      <Dialog
        open={!!postToEdit}
        onOpenChange={() => setPostToEdit(null)}
        title="Edit post"
      >
        <PostForm
          formData={postToEdit}
          onEditSuccess={() => setPostToEdit(null)}
        />
      </Dialog>

      <ConfirmationDialog
        open={!!postIdToDelete}
        onOpenChange={() => setPostIdToDelete(null)}
        onConfirm={() => onDelete(postIdToDelete as number)}
        loading={deletePost.isPending}
      />
    </div>
  );
};

export default Page;
