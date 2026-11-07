import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { getApiError } from "@/services/apiClient";
import { loginSchema, type loginInput } from "../schema";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { useLogin } from "../useLogin";
import ErrorMessage from "@/ui/ErrorMessage";
import { Button } from "@/ui/button";

export default function LoginForm() {
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<loginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    login(values, {
      onError: (error) => {
        const apiError = getApiError(error);

        if (!apiError) {
          setError("root", {
            message: "Something went wrong. Please try again.",
          });
          return;
        }

        setError("root", { message: apiError.message });
      },
    });
  });

  return (
    <div className="flex flex-col gap-7.5">
      <div className="flex flex-col gap-3">
        <h2 className="text-ink text-3xl font-bold">Login to your account</h2>
        <p className="text-muted text-sm">
          Welcome to OCTOM. Let&apos;s get you set up.
        </p>
      </div>

      <form className="flex flex-col gap-7.5" onSubmit={onSubmit} noValidate>
        <div className="flex flex-col gap-5">
          <FormField
            id="email"
            label="Email address"
            icon={Mail}
            type="email"
            placeholder="killanjames@gmail.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordField
            id="password"
            label="Password"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="flex flex-col gap-5">
          {errors.root?.message && (
            <ErrorMessage message={errors.root?.message} />
          )}

          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="size-4.5 animate-spin" />}
            <span>{isPending ? "Logging in..." : "Log in"}</span>
            {!isPending && <ArrowRight className="size-4.5" />}
          </Button>

          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="text-muted size-3.5" />
            <p className="text-muted text-xs">
              Your details stay private and secure.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
