export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

type UserInput = Omit<User, "id" | "createdAt">;

export type CreateUser = UserInput;

export type UpdateUser = Partial<UserInput>;

export type ReplaceUser = UserInput; 

export interface UserRepositorySchema {
    createUser(user: CreateUser): Promise<User>;
    updateUser(id:  string, user: UpdateUser): Promise<User>;
    replaceUser(id: string, user: ReplaceUser): Promise<User>;
    deleteUser(id: string): Promise<User>;
    findAllUsers(): Promise<Array<User>> ;
    findUserById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
}