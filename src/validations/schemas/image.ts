import Joi from "joi";

import { IImage } from "../../@types";

export const imageSchema = Joi.object<IImage>({
    url: Joi.string().uri().required(),
    alt: Joi.string().min(2).max(50).required(),
});

export default imageSchema;