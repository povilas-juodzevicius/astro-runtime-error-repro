import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = Fastify({ logger: true });

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL("./dist/client", import.meta.url)),
  })
  .register(fastifyMiddie);

app.use(ssrHandler);

app.setErrorHandler(async (error, request, reply) => {
  console.log("Inside the setErrorHandler handler");
  reply.send("There was an error");
  return reply;
});

app.listen({ port: 8080 });
