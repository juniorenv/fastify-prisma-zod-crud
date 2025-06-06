import "@fastify/jwt"

interface JwtPayload {
    id: string
    email: string
}

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        payload: JwtPayload;
        user: JwtPayload;
    }
}