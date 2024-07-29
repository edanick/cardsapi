import { ICardInput } from ".";

export type ICard = ICardInput & {
    _id: string,
    bizNumber: number,
    createdAt: Date,
    likes: string[],
    userId: string
};