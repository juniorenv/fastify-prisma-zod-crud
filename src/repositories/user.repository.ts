import { CreateUser, User, UpdateUser, UserRepositorySchema, ReplaceUser } from "types/user.interface.js";
import { prisma } from "lib/prisma.js";

export class UserRepository implements UserRepositorySchema {
    public async createUser(user: CreateUser): Promise<User> {
        const createdUser = await prisma.user.create({
            data: user
        });

        return createdUser;
    };

    public async updateUser(id: string, user: UpdateUser): Promise<User> {
        const userToUpdate = await prisma.user.update({
            where: { id },
            data: user
        })
        
        return userToUpdate;
    }
    
    public async replaceUser(id: string, user: ReplaceUser): Promise<User> {
        const userToReplace = await prisma.user.update({
            where: { id },
            data: user
        })
        
        return userToReplace;
    }

    public async deleteUser(id: string): Promise<User> {
        const userToDelete = await prisma.user.delete({
            where: { id }
        });
        
        return userToDelete;
    };

    public async findUserByEmail(email: string): Promise<User | null> {
        const findUser = await prisma.user.findUnique({
            where: { email }
        });

        return findUser;
    };

    public async findUserById(id: string): Promise<User | null> {
        const findUser = await prisma.user.findUnique({
            where: { id }
        });

        return findUser;
    };

    public async findAllUsers(): Promise<Array<User>> {
        const allUsers =  await prisma.user.findMany();

        return allUsers;
    };
}