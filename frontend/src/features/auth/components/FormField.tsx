import type { ComponentPropsWithRef, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type FormFieldProps = ComponentPropsWithRef<"input"> & {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
  helper?: string;
  startAddon?: ReactNode;
  rightSlot?: ReactNode;
};

export default function FormField({
  id,
  label,
  icon: Icon,
  error,
  helper,
  startAddon,
  rightSlot,
  className,
  ...inputProps
}: FormFieldProps) {
  const describedBy = error
    ? `${id}-error`
    : helper
      ? `${id}-helper`
      : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-ink text-sm font-medium">
        {label}
      </label>

      <div className="border-subtle bg-card focus-within:border-action focus-within:ring-action/20 flex h-11 items-center gap-3 rounded-lg border px-4 transition focus-within:ring-2">
        <Icon className="text-muted size-[18px] shrink-0" />

        {startAddon ? (
          <div className="flex shrink-0 items-center gap-2">{startAddon}</div>
        ) : null}

        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`text-ink placeholder:text-muted h-full flex-1 bg-transparent text-sm outline-none ${className ?? ""}`}
          {...inputProps}
        />

        {rightSlot}
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-presence-busy text-xs">
          {error}
        </p>
      ) : helper ? (
        <p id={`${id}-helper`} className="text-muted text-xs">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
