import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import FormField from "./FormField";
import { useState, type ComponentPropsWithRef } from "react";

type FormFieldProps = ComponentPropsWithRef<"input"> & {
  id: string;
  label: string;
  error?: string;
  helper?: string;
};

function PasswordField({
  id,
  label,
  error,
  helper,
  ...inputProps
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      id={id}
      label={label}
      icon={LockKeyhole}
      type={showPassword ? "text" : "password"}
      placeholder="••••••••••••"
      autoComplete="new-password"
      helper={helper}
      error={error}
      rightSlot={
        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="text-muted hover:text-ink focus-visible:ring-action/40 shrink-0 transition focus-visible:ring-2 focus-visible:outline-none"
        >
          {showPassword ? (
            <EyeOff className="size-4.5" />
          ) : (
            <Eye className="size-4.5" />
          )}
        </button>
      }
      {...inputProps}
    />
  );
}

export default PasswordField;
