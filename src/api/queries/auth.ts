import { useMutation } from "@tanstack/react-query";
import api from "../axios";
import { ILogin, IRequestError, ISignup } from "@/utils/types";
import toast from "react-hot-toast";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: ISignup) => api.post("/auth/signup", data),
    onError: (error: IRequestError) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: ILogin) => api.post("/auth/login", data),
    onError: (error: IRequestError) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onError: (error: IRequestError) => {
      toast.error(error.response?.data?.message);
    },
  });
};
