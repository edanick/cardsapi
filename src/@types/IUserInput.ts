import { IAddress, IImage, IName } from ".";

export type IUserInput = {
    email: string,
    phone: string,
    password: string,
    isBusiness: boolean,
    address: IAddress,
    name: IName,
    image?: IImage
};