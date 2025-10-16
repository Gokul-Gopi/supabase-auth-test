import { useMutation } from "@tanstack/react-query";
import { ILogin, ISignup } from "@/utils/types";
import { onError } from "@/utils/client/helpers";
import supabase from "@/utils/client/supabase";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: ISignup) =>
      supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data,
        },
      }),
    onError: onError,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: ILogin) => {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) throw error;
    },
    onError: onError,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onError: onError,
  });
};

export const useCreateSession = () => {
  return useMutation({
    mutationFn: async (code: string) =>
      supabase.auth.exchangeCodeForSession(code),
  });
};
