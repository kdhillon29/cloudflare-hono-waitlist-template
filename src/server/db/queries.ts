import type { D1Database } from "@cloudflare/workers-types";
import { getDb } from "./db";
import type { NewSubscriber } from "./schema";
import { subscribers } from "./schema";

export const insertSubscriber = async (
  dbBinding: D1Database,
  newSubscriber: NewSubscriber,
) => {
  const db = getDb(dbBinding);
  const [result] = await db
    .insert(subscribers)
    .values(newSubscriber)
    .returning();
  return result;
};
