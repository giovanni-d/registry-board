import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const handler = (): Response => {
  return new Response(`<html><body><h1>Hello, Deno1!</h1></body></html>`, {
    headers: { "content-type": "text/html" },
  });
};

await serve(
  handler, {
    addr: '127.0.0.1:3000'
  }
);