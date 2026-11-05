import { z } from "zod";

export const signupFields = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .regex(/^1[0125]\d{8}$/, "Enter a valid Egyptian mobile number"),
  password: z
    .string()
    .min(8, "Use at least 8 characters")
    .regex(/\d/, "Include at least one number"),
  passwordConfirm: z.string().min(1, "Confirm your password"),
});

export const signupSchema = signupFields.refine(
  (data) => data.password === data.passwordConfirm,
  {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  },
);

export type SignupInput = z.infer<typeof signupSchema>;
