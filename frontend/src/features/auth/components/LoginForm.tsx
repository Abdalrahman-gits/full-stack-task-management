import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { getApiError } from "../../../services/apiClient";
import { loginSchema, signupFields, type loginInput } from "../schema";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { useLogin } from "../useLogin";

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
        if (apiError.errors?.length) {
          let mapped = false;

          for (const detail of apiError.errors) {
            if (detail.field in signupFields.shape) {
              setError(detail.field as keyof loginInput, {
                message: detail.message,
              });
              mapped = true;
            }
          }

          if (mapped) return;
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
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="flex flex-col gap-5">
          {errors.root?.message && (
            <p
              role="alert"
              className="border-presence-busy/30 bg-presence-busy/10 text-presence-busy rounded-lg border px-4 py-3 text-sm"
            >
              {errors.root?.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-action focus-visible:ring-action/40 flex h-12 items-center justify-center gap-3 rounded-lg text-base font-medium text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending && <Loader2 className="size-4.5 animate-spin" />}
            <span>{isPending ? "Logging in..." : "Log in"}</span>
            {!isPending && <ArrowRight className="size-4.5" />}
          </button>

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
