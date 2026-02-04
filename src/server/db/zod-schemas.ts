// db/zod-schemas.ts
import { createInsertSchema } from "drizzle-zod";
import { subscribers } from "./schema";

// Create an insert schema for validation
export const insertSubscriberSchema = createInsertSchema(subscribers);

// Infer TypeScript type for use in Hono and React
export type InsertSubscriber = typeof insertSubscriberSchema;
