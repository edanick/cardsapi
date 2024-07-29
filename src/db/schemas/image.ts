import { Schema } from "mongoose";
import { IImage } from "../../@types";

export default new Schema<IImage>({
  url: { type: String, required: true, minlength: 14, maxlength: 256 },
  alt: { type: String, required: true, minlength: 2, maxlength: 256 }
});
