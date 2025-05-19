import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function zodErrorHandler(error: FastifyError, _: FastifyRequest, reply: FastifyReply) {
    if (error instanceof ZodError) {
        const errors = error.issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message,
            expected: issue.code === "invalid_type" ? issue.expected : undefined,
            received: issue.code === "invalid_type" ? issue.received : undefined
        }));

        return reply.status(400).send({
            error: "Bad Request",
            errors
        })
    }
    
    return reply.send(error);
}