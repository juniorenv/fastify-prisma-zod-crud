import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRequest, GetUserIdRequest, ReplaceUserRequest, UpdateUserRequest } from "types/request.interface.js";
import { CreateUser, UpdateUser } from "types/user.interface.js";
import { UserUseCase } from "usecases/user.usecase.js";
import { z } from "zod";

export default async function userRoutes(app: FastifyInstance) {
    const userUseCase = new UserUseCase();

    const userZodSchema = z.object({
        name: z.string().min(3, "Name must contain at least 3 character(s)"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(3),
    }) satisfies z.ZodType<CreateUser>

    const partialUserZodSchema = z.object({
        name: z.string().min(3, "Name must contain at least 3 character(s)").optional(),
        email: z.string().email("Invalid email format").optional(),
        password: z.string().min(3).optional(),
    }) satisfies z.ZodType<UpdateUser>

    app.get("/:userId?", async(req: FastifyRequest<GetUserIdRequest>, reply: FastifyReply) => {
        try {
            const { userId } = req.params;
            
            const result = userId
                ? await userUseCase.getUser(userId)
                : await userUseCase.listAllUsers()

            return reply.status(200).send(result);
        } catch (err) {
            return reply.send(err);
        }
    })

    app.post("/", async (req: FastifyRequest<CreateUserRequest>, reply: FastifyReply) => {
        try {
            const { name, email, password } = userZodSchema.parse(req.body);
            
            const result = await userUseCase.registerUser({ name, email, password });

            return reply.status(201).send({
                message: "User successfully created",
                data: result
            });
        } catch (err) {
            return reply.send(err);
        }
    })
    
    app.patch("/:userId", async (req: FastifyRequest<UpdateUserRequest>, reply: FastifyReply) => {
        try {
            const { userId } = req.params;
            const { name, email, password } = partialUserZodSchema.parse(req.body);

            const result = await userUseCase.updateUserAccount(userId, { name, email, password })
            
            return reply.status(200).send({
                message: "User successfully updated",
                data: result
            });
        } catch (err) {
            return reply.send(err);
        }
    })
    
    app.put("/:userId", async (req: FastifyRequest<ReplaceUserRequest>, reply: FastifyReply) => {
        try {
            const { userId } = req.params;
            const { name, email, password } = userZodSchema.parse(req.body);

            const result = await userUseCase.replaceUserAccount(userId, { name, email, password })
            
            return reply.status(200).send({
                message: "User successfully replaced",
                data: result
            });
        } catch (err) {
            return reply.send(err);
        }
    })

    app.delete("/:userId", async (req: FastifyRequest<GetUserIdRequest>, reply: FastifyReply) => {
        try {
            const userRemoved = await userUseCase.removeUser(req.params.userId);
            
            return reply.status(200).send({
                message: "User successfully removed",
                data: userRemoved
            });
        } catch (err) {
            return reply.send(err);
        }
    })
}