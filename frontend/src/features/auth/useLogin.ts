import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { loginInput } from "./schema";
import { login as loginApi, type User } from "../../services/authService";
import { useNavigate } from "react-router";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }: loginInput) => loginApi(email, password),
    onSuccess: (user: User) => {
      queryClient.setQueryData(["auth", "me"], user);
      navigate("/dashboard");
    },
  });

  return { login, isPending, isError };
}

export { useLogin };
