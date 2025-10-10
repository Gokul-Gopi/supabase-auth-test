import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../axios";
import { ILogin, ISignup } from "@/utils/types";
import { onError } from "@/utils/client/helpers";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: ISignup) => api.post("/auth/signup", data),
    onError: onError,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: ILogin) => api.post("/auth/login", data),
    onError: onError,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onError: onError,
  });
};

export const useCreateSession = () => {
  return useMutation({
    mutationFn: (code: string) => api.post("/auth/create-session", { code }),
  });
};
