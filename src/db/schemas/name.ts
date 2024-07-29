import { Schema } from "mongoose";
import { IName } from "../../@types";



export default new Schema<IName>({
    _id: false,
    first: { type: String, required: true, minlength: 2, maxlength: 20 },
    middle: { type: String, required: false, default: "", minlength: 0, maxlength: 20 },
    last: { type: String, required: true, minlength: 2, maxlength: 20 }
});
