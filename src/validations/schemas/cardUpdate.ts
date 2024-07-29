import Joi from "joi";
import { ICardInput } from "../../@types";
import { phoneRegex } from "../patterns";
import addressSchema from "./address";
import imageSchema from "./image";


const cardUpdateSchema = Joi.object<ICardInput>({
  title: Joi.string().min(2).max(256),
  subtitle: Joi.string().min(2).max(256),
  description: Joi.string().min(2).max(1024),
  email: Joi.string().email().min(5).max(30),
  phone: Joi.string().pattern(phoneRegex).min(9).max(11),
  web: Joi.string().uri().min(14).max(100),
  address: addressSchema,
  image: imageSchema
});

export default cardUpdateSchema;