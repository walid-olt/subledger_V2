import z from "zod";
import { config } from "dotenv";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "dev", "prod", "test"]).default("development"),
  PORT: z.string().default("3000"),
  MONGODB_URI: z.string().default(""),
  MONGODB_DB_NAME: z.string().default("subledger_v1"),
  JWT_SECRET_KEY: z.string().min(32).default("test-jwt-secret-key-that-is-32-chars!"),
  JWT_EXPIRES_IN: z.string().default("1h"),
});

function loadEnv() {
  config();
  const nodeEnv = process.env.NODE_ENV;
  const { success, data, error } = envSchema.safeParse(process.env);
  if (!success) {
    console.error("Invalid environment variables", error.format());
    if (nodeEnv === "dev" || nodeEnv === "prod") {
      process.exit(1);
    }
    throw new Error("Invalid environment variables");
  }
  return data;
}

const env = loadEnv();
export default env;
