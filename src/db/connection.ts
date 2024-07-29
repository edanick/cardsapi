import mongoose from "mongoose";
import logger from "../logger";

export async function connect() {

    try {
        return await mongoose.connect(process.env.DB_CONNECTION_STRING);
    } catch (err) {
        logger.error(`Failed to connect to database: ${err}`);
    }

}