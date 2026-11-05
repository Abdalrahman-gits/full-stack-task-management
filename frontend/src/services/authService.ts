import type { ApiSuccess } from "../types/api";
import { api } from "./apiClient";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
};

type UserResponse = ApiSuccess<{ user: User }>;

export async function signup(payload: SignupPayload): Promise<User> {
  const { data } = await api.post<UserResponse>("/users/signup", payload);
  return data.data.user;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<UserResponse>("/users/login", {
    email,
    password,
  });
  return data.data.user;
}

export async function refreshSession(): Promise<void> {
  await api.post("/users/refresh-token");
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<UserResponse>("/users/me");
  return data.data.user;
}
