import { Schema } from "mongoose";
import { IAddress } from "../../@types";

export default new Schema<IAddress>({
    _id: false,
    country: { type: String, required: true, minlength: 2, maxlength: 256 },
    state: { type: String, required: false, minlength: 2, maxlength: 256 },
    city: { type: String, required: true, minlength: 2, maxlength: 256 },
    street: { type: String, required: true, minlength: 2, maxlength: 256 },
    zip: { type: String, required: true, minlength: 2, maxlength: 256 },
    houseNumber: { type: Number, required: true, min: 2, max: 256 }
});
