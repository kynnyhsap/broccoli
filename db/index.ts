import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const client = createClient({
  url: process.env.LOCAL_DB_URL!,
  syncUrl: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,

  syncInterval: 60,
});

export const db = drizzle(client);
