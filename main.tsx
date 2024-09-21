import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { logger } from "hono/logger";
import { Home } from "./pages/index.tsx";
import { Layout } from "./pages/layout.tsx";
import { loadConfig, resetConfig, saveConfig } from "./lib.ts";
import { Env } from "./types.ts";
import "@std/dotenv/load";

const app = new Hono<Env>();

app.use(async (ctx, next) => {
  ctx.set("config", await loadConfig());
  await next();
});

app.use(logger());

app.use(jsxRenderer(({ children }) => {
  return (
    <Layout>
      <h1>Registry Board</h1>
      {children}
    </Layout>
  );
}));

app.get("/", (ctx) => {
  return ctx.render(<Home />);
});

app.get("/config", async (ctx) => {
  const config = await loadConfig();
  return ctx.json(config);
});

app.get("/config/reset", async (ctx) => {
  await resetConfig();
  return ctx.redirect("/");
});

app.post("/api/registry-url", async (ctx) => {
  const body = await ctx.req.formData();
  const registryUrl = body.get("registryUrl")?.toString();

  if (registryUrl) {
    const saved = await saveConfig({
      registryUrl,
    });

    if (saved) {
      console.log("saved config");
    }
  }

  return ctx.redirect("/");
});

const port = Deno.env.get("PORT") ?? 3000;
Deno.serve({ port: Number(port) }, app.fetch);
