import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { LoginUserRequest } from "types/request.interface.js";
import { LoginUser } from "types/user.interface.js";
import { UserUseCase } from "usecases/user.usecase.js";
import { z } from "zod";

export default async function loginRoutes(app: FastifyInstance) {
    const userUseCase = new UserUseCase();

    const loginSchema = z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(3),
    }) satisfies z.ZodType<LoginUser>

    app.post<LoginUserRequest>("/", async (req: FastifyRequest<LoginUserRequest>, reply: FastifyReply) => {
        try {
            const { email, password } = loginSchema.parse(req.body);

            const user = await userUseCase.authenticateUser({ email, password });

            const userToSign = {
                id: user.id,
                email: user.email,
            }
            
            const token = app.jwt.sign(userToSign, {
                expiresIn: "30m"
            });

            return reply.status(200).send({
                userId: user.id,
                token
            });
        } catch (err) {
            return reply.send(err)
        }
    })
}