import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { getApiError } from "../../../services/apiClient";
import { signup, type User } from "../../../services/authService";
import { signupFields, signupSchema, type SignupInput } from "../schema";
import FormField from "./FormField";

export default function SignupForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [rootError, setRootError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: SignupInput) =>
      signup({ ...values, phone: `0${values.phone}` }),
    onSuccess: (user: User) => {
      queryClient.setQueryData(["auth", "me"], user);
      navigate("/dashboard");
    },
    onError: (error) => {
      const apiError = getApiError(error);

      if (!apiError) {
        setRootError("Something went wrong. Please try again.");
        return;
      }

      if (apiError.errors?.length) {
        let mapped = false;

        for (const detail of apiError.errors) {
          if (detail.field in signupFields.shape) {
            setError(detail.field as keyof SignupInput, {
              message: detail.message,
            });
            mapped = true;
          }
        }

        if (mapped) return;
      }

      setRootError(apiError.message);
    },
  });

  const onSubmit = handleSubmit((values) => {
    setRootError(null);
    mutation.mutate(values);
  });

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-3">
        <h2 className="text-ink text-3xl font-bold">Create your account</h2>
        <p className="text-muted text-sm">
          Welcome to OCTOM. Let’s get you set up.
        </p>
      </div>

      <form className="flex flex-col gap-[30px]" onSubmit={onSubmit} noValidate>
        <div className="flex flex-col gap-5">
          <FormField
            id="name"
            label="Full name"
            icon={UserRound}
            type="text"
            placeholder="Killan James"
            autoComplete="name"
            error={errors.name?.message}
            {...register("name")}
          />

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

          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormField
                id="phone"
                label="Phone number"
                icon={Phone}
                type="tel"
                inputMode="numeric"
                placeholder="10 1234 5678"
                autoComplete="tel-national"
                name={field.name}
                ref={field.ref}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(event) =>
                  field.onChange(
                    event.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                error={fieldState.error?.message}
                startAddon={
                  <>
                    <span className="text-ink text-sm">+20</span>
                    <span className="bg-subtle h-5 w-px" />
                  </>
                }
              />
            )}
          />

          <FormField
            id="password"
            label="Password"
            icon={LockKeyhole}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            autoComplete="new-password"
            helper="Use at least 8 characters, including a number."
            error={errors.password?.message}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-muted hover:text-ink focus-visible:ring-action/40 shrink-0 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="size-[18px]" />
                ) : (
                  <Eye className="size-[18px]" />
                )}
              </button>
            }
            {...register("password")}
          />

          <FormField
            id="passwordConfirm"
            label="Confirm password"
            icon={LockKeyhole}
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="••••••••••••"
            autoComplete="new-password"
            error={errors.passwordConfirm?.message}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPasswordConfirm((visible) => !visible)}
                aria-label={
                  showPasswordConfirm ? "Hide password" : "Show password"
                }
                className="text-muted hover:text-ink focus-visible:ring-action/40 shrink-0 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                {showPasswordConfirm ? (
                  <EyeOff className="size-[18px]" />
                ) : (
                  <Eye className="size-[18px]" />
                )}
              </button>
            }
            {...register("passwordConfirm")}
          />
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-muted text-[13px]">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-action hover:underline">
              Terms of service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-action hover:underline">
              Privacy policy
            </a>
            .
          </p>

          {rootError ? (
            <p
              role="alert"
              className="border-presence-busy/30 bg-presence-busy/10 text-presence-busy rounded-lg border px-4 py-3 text-sm"
            >
              {rootError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-action focus-visible:ring-action/40 flex h-12 items-center justify-center gap-3 rounded-lg text-base font-medium text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            {mutation.isPending ? (
              <Loader2 className="size-[18px] animate-spin" />
            ) : null}
            <span>
              {mutation.isPending ? "Creating account…" : "Create account"}
            </span>
            {!mutation.isPending ? (
              <ArrowRight className="size-[18px]" />
            ) : null}
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
