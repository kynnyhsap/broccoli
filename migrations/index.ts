import { db } from "../db";
import { migrate } from "drizzle-orm/libsql/migrator";

(async () => {
  await migrate(db, { migrationsFolder: "./migrations" });
})();
