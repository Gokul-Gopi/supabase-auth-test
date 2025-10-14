import { AxiosError, AxiosResponse } from "axios";

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
