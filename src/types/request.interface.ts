import { LoginUser, ReplaceUser, UpdateUser } from "./user.interface.js";

export interface UpdateUserRequest {
    Body: UpdateUser,
    Params: {
        userId: string
    }
};

export interface ReplaceUserRequest {
    Body: ReplaceUser,
    Params: {
        userId: string
    }
};

export interface LoginUserRequest {
    Body: LoginUser
};

export type CreateUserRequest = Omit<UpdateUserRequest, "Params">;

export type GetUserIdRequest = Omit<UpdateUserRequest, "Body">;