import "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export type ApiSuccess<T> = {
  status: "success";
  data: T;
};

export type ApiErrorDetail = {
  field: string;
  message: string;
};

export type ApiErrorBody = {
  status: "fail" | "error";
  message: string;
  errors?: ApiErrorDetail[];
};
