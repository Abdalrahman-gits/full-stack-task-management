import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SignupInput } from "./schema";
import { signup as signupApi, type User } from "../../services/authService";
import { useNavigate } from "react-router";

function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (values: SignupInput) =>
      signupApi({ ...values, phone: `0${values.phone}` }),
    onSuccess: (user: User) => {
      queryClient.setQueryData(["auth", "me"], user);
      navigate("/dashboard");
    },
  });

  return { signup, isPending, isError };
}

export { useSignup };
