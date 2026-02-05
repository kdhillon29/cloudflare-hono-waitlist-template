import type { D1Database } from "@cloudflare/workers-types";
import { eq } from "drizzle-orm";
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

export const isSubscriberExists = async (
  dbBinding: D1Database,
  email: string,
) => {
  const db = getDb(dbBinding);
  const subscriber = await db.query.subscribers.findFirst({
    where: eq(subscribers.email, email),
  });
  return subscriber;
};

export const countSubscribers = async (dbBinding: D1Database) => {
  const db = getDb(dbBinding);
  const countResult = await db.$count(subscribers);
  return countResult;
};
