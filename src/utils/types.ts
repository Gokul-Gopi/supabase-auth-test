import { AxiosError, AxiosResponse } from "axios";

export interface IDocument {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISignup {
  email: string;
  password: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

interface AxiosErrorResponse extends AxiosResponse {
  data: {
    message: string;
  };
}

export interface IRequestError extends AxiosError {
  response: AxiosErrorResponse;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface IPostForm {
  title: string;
  content: string;
}

export interface IPostData extends IPostForm {
  id: number;
}

export interface IPost extends IDocument, IPostData {}
