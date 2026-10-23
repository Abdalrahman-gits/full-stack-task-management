import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  // z.coerce converts to another type "Here is to number"
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE: z.url(),
  DATABASE_USERNAME: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  ACCESS_TOKEN_KEY: z.string().min(17),
  ACCESS_TOKEN_EXPIRES_IN_MS: z.coerce.number().int().positive(),
  REFRESH_TOKEN_KEY: z.string().min(17),
  REFRESH_TOKEN_EXPIRES_IN_MS: z.coerce.number().int().positive(),
});

const envData = envSchema.safeParse(process.env);

if (!envData.success) {
  console.error(z.prettifyError(envData.error));
  process.exit(1);
}

export default envData.data;
