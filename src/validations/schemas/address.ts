import Joi from "joi";

import { IAddress } from "../../@types";

export const addressSchema = Joi.object<IAddress>({
  city: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  houseNumber: Joi.number().min(2).max(256).required(),
  street: Joi.string().min(2).max(50).required(),
  zip: Joi.string().min(2).max(10).required(),
  state: Joi.string().min(2).max(50),
});

export default addressSchema;