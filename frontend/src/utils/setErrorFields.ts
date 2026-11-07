import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import type { ApiErrorBody } from "../types/api";

export function setErrorFields<T extends FieldValues>(
  setError: UseFormSetError<T>,
  apiError: ApiErrorBody,
  fieldsSchema: { shape: Record<string, unknown> },
): boolean {
  if (!apiError.errors?.length) return false;

  let mapped = false;

  for (const detail of apiError.errors) {
    if (detail.field in fieldsSchema.shape) {
      setError(detail.field as FieldPath<T>, {
        message: detail.message,
      });
      mapped = true;
    }
  }

  return mapped;
}
