import Joi from "joi";
import { passwordRegex, phoneRegex } from "../patterns";
import { IName, IUser } from "../../@types";
import { addressSchema, imageSchema } from ".";



export const userSchema = Joi.object<IUser>({
  isBusiness: Joi.boolean().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
  address: addressSchema.required(),
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(50).required(),
    middle: Joi.string().min(0),
    last: Joi.string().min(2).max(50).required(),
  }).required(),
  image: imageSchema,
});

export default userSchema;

