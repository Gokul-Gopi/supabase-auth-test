import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../axios";
import { onError } from "@/utils/client/helpers";
import { IPost, IPostData, IPostForm } from "@/utils/types";

export const usePosts = () => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get<{ data: IPost[] }>("/post");
      return response.data;
    },
    queryKey: ["posts"],
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IPostForm) => api.post("/post", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onError: onError,
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...body }: IPostData) =>
      api.put("/post", body, {
        params: {
          id,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onError: onError,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      api.delete("/post", {
        params: {
          id,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onError: onError,
  });
};
