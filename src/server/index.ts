import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";

const app = new Hono();

app.use(accessAuth);
const route = app.get("/api/health", (c) => {
  return c.json("Server is healthy!❤️ ");
});

export type AppType = typeof route;
export default app;
