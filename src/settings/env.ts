import { z } from "zod";

const envSchema = z.object({
    HOST: z.string().default("0.0.0.0"),
    PORT: z.number({ coerce: true }).default(3000),
    JWT_SECRET: z.string().default("mysecret"),
});

type EnvFile = z.infer<typeof envSchema>;

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvFile { }
    }
}

const parsedEnv = envSchema.parse(process.env);
process.env = Object.create({...process.env, ...parsedEnv});