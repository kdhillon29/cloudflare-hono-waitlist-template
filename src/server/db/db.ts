import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema.ts";
import type { D1Database } from "@cloudflare/workers-types";

export function getDb(binding: D1Database) {
  return drizzle(binding, { schema });
}
export type DrizzleDb = ReturnType<typeof getDb>;
