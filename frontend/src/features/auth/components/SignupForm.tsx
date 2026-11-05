import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { getApiError } from "../../../services/apiClient";
import { signupFields, signupSchema, type SignupInput } from "../schema";
import FormField from "./FormField";
import { useSignup } from "../useSignup";
import PasswordField from "./PasswordField";

export default function SignupForm() {
  const { signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    signup(values, {
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
              setError(detail.field as keyof SignupInput, {
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
        <h2 className="text-ink text-3xl font-bold">Create your account</h2>
        <p className="text-muted text-sm">
          Welcome to OCTOM. Let&apos;s get you set up.
        </p>
      </div>

      <form className="flex flex-col gap-7.5" onSubmit={onSubmit} noValidate>
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

          <FormField
            id="phone"
            label="Phone number"
            icon={Phone}
            type="tel"
            inputMode="numeric"
            placeholder="10 1234 5678"
            autoComplete="tel-national"
            {...register("phone", {
              onChange: (e) => {
                setValue(
                  "phone",
                  e.target.value.replace(/\D/g, "").slice(0, 10),
                );
              },
            })}
            error={errors.phone?.message}
            startAddon={
              <>
                <span className="text-ink text-sm">+20</span>
                <span className="bg-subtle h-5 w-px" />
              </>
            }
          />

          <PasswordField
            id="password"
            label="Password"
            helper="Use at least 8 characters, including a number."
            {...register("password")}
            error={errors.password?.message}
          />

          <PasswordField
            id="passwordConfirm"
            label="Confirm password"
            {...register("passwordConfirm")}
            error={errors.passwordConfirm?.message}
          />
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-muted text-[13px]">
            By creating an account, you agree to our{" "}
            <span
              onClick={(e) => e.preventDefault()}
              className="text-action cursor-pointer hover:underline"
            >
              Terms of service
            </span>{" "}
            and{" "}
            <span
              onClick={(e) => e.preventDefault()}
              className="text-action cursor-pointer hover:underline"
            >
              Privacy policy
            </span>
            .
          </p>

          {errors.root?.message ? (
            <p
              role="alert"
              className="border-presence-busy/30 bg-presence-busy/10 text-presence-busy rounded-lg border px-4 py-3 text-sm"
            >
              {errors.root?.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="bg-action focus-visible:ring-action/40 flex h-12 items-center justify-center gap-3 rounded-lg text-base font-medium text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? <Loader2 className="size-4.5 animate-spin" /> : null}
            <span>{isPending ? "Creating account…" : "Create account"}</span>
            {!isPending ? <ArrowRight className="size-4.5" /> : null}
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
