import Joi from "joi";
import { passwordRegex, phoneRegex } from "../patterns";
import { IName, IUser } from "../../@types";
import { addressSchema, imageSchema } from ".";



export const userUpdateSchema = Joi.object<IUser>({
    isBusiness: Joi.boolean(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(phoneRegex),
    password: Joi.string().pattern(passwordRegex),
    address: addressSchema,
    name: Joi.object<IName>({
        first: Joi.string().min(2).max(50).required(),
        middle: Joi.string().min(0),
        last: Joi.string().min(2).max(50).required(),
    }),
    image: imageSchema,
});

export default userUpdateSchema;

