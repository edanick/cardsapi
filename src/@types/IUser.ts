import { IUserInput } from '.';

export type IUser = IUserInput & {
    createdAt: Date,
    isAdmin: boolean
};