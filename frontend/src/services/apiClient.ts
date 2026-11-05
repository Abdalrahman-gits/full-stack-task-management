import axios, { type AxiosError } from "axios";
import type { ApiErrorBody } from "../types/api";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api/v1",
  withCredentials: true,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

const authRoutes = /\/users\/(refresh-token|login|signup)$/;

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const request = error.config;
    const url = request?.url ?? "";

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retry ||
      authRoutes.test(url)
    ) {
      return Promise.reject(error);
    }

    request._retry = true;

    refreshPromise ??= api
      .post("/users/refresh-token")
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });

    try {
      await refreshPromise;
      return api(request);
    } catch (refreshError) {
      window.dispatchEvent(new Event("auth:session-expired"));
      return Promise.reject(refreshError);
    }
  },
);

export function getApiError(error: unknown): ApiErrorBody | null {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data ?? null;
  }

  return null;
}
