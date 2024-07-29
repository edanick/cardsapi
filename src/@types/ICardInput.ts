import { IAddress, IImage } from ".";

export type ICardInput = {
    title: string,
    subtitle: string,
    description: string,
    phone: string,
    email: string,
    web: string,
    image: IImage,
    address: IAddress
};