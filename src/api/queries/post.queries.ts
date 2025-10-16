import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { onError } from "@/utils/client/helpers";
import { IPost, IPostData, IPostForm } from "@/utils/types";
import supabase from "@/utils/client/supabase";
import useAuthStore from "@/store/userStore";

export const usePosts = () => {
  return useQuery<IPost[]>({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .order("createdAt");

      if (error) throw error;

      return data;
    },
    queryKey: ["posts"],
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  return useMutation({
    mutationFn: async (data: IPostForm) => {
      const { error } = await supabase.from("Post").insert({ ...data, userId });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onError: onError,
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...body }: IPostData) => {
      const { error } = await supabase.from("Post").update(body).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onError: onError,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("Post").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onError: onError,
  });
};
