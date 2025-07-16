import { z } from "zod";

const envPreprocess = (value: unknown) => value === "" ? undefined : value;

const envSchema = z.object({
    HOST: z.preprocess(
        envPreprocess,
        z.string().default("0.0.0.0")),

    PORT: z.preprocess(
        envPreprocess,
        z.number({ coerce: true }).default(3000)
    ),

    // Note: Default secret for demo only - use env variable in production 
    JWT_SECRET: z.preprocess(
        envPreprocess,
        z.string().default("mysecret")
    ),
});

type EnvFile = z.infer<typeof envSchema>;

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvFile { }
    }
}

const parsedEnv = envSchema.parse(process.env);
process.env = Object.create({...process.env, ...parsedEnv});