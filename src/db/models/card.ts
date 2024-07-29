import mongoose from "mongoose";
import { cardSchema } from "../schemas";
export default mongoose.model("Card", cardSchema);