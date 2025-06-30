import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { join } from "node:path";
import "./settings/env.js";
import { zodErrorHandler } from "functions/error.js";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

const loggerConfig = process.env.NODE_ENV == "production"
    ? true
    : {
        transport: {
            target: "pino-pretty"
        }
    }

const app = Fastify({
    logger: loggerConfig
});

const { HOST, PORT } = process.env;

app.register(fastifyCors, {
    origin: "*"
});

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
});

app.setErrorHandler(zodErrorHandler);

app.register(autoLoad, {
    dir: join(import.meta.dirname, "routes"),
    forceESM: true,
    options: { prefix: "/api" }
});

app.addHook("onRoute", async ({ method, path }) => {
    if (method === "HEAD" || method === "OPTIONS") return;
    console.log(`${method} ${path}`);
})

const start = async () => {
    try {
        await app.listen({ host: HOST, port: PORT });
        app.log.info(`Server listening on ${PORT}`);
    } catch (e) {
        app.log.error(e);
        process.exit(1);
    }
}

start();