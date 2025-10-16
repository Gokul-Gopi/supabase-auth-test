import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IRequestError } from "../types";
import toast from "react-hot-toast";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const onError = (error: IRequestError) =>
  toast.error(
    error.response?.data?.message || error?.message || "Something went wrong",
  );
