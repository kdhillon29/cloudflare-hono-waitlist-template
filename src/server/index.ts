import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";

const app = new Hono();

app.use(accessAuth);
app.get("/api/health", (c) => {
  return c.json("Server is healthy!❤️ ");
});

export default app;
