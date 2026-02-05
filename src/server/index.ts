import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";
import type { D1Database } from "@cloudflare/workers-types";
import {
  insertSubscriber,
  isSubscriberExists,
  countSubscribers,
} from "./db/queries";
import { zValidator } from "@hono/zod-validator";
import { insertSubscriberSchema } from "../server/db/zod-schemas";
interface CloudflareBindings {
  DB: D1Database;
}

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(accessAuth);
const route = app
  .get("/api/health", (c) => {
    return c.json("Server is healthy!❤️ ");
  })

  .post(
    "/api/subscribe",
    zValidator("json", insertSubscriberSchema),
    async (c) => {
      const { email } = c.req.valid("json");

      if (await isSubscriberExists(c.env.DB, email)) {
        return c.json({ error: "Email already subscribed" }, 400);
      }

      const user = await insertSubscriber(c.env.DB, { email });
      return c.json({
        message: "Thank you for subscribing!",
        error: false,
        user,
      });
    },
  )
  .get("/api/subscribers/count", async (c) => {
    const count = await countSubscribers(c.env.DB);
    return c.json(count);
  });
export type AppType = typeof route;
export default app;
