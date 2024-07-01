import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.LOCAL_DB_URL!,
  },
});
