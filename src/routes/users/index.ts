import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { auth, isAdmin } from "../../middleware";
import userSchema from "../../validations/schemas/user";
import User from "../../db/models/user";
import logger from "../../logger";

export const usersRouter = express.Router();

usersRouter.route('/').
    get(auth, isAdmin, async (req: any, res) => {
            logger.success(`Code 200 | Admin has recieved a list of all users`, req);
            res.json(await User.find({}));
    }).
    post(async (req, res) => {

        const validation = userSchema.validate(req.body);

        if (validation.error) {

            let errMsg = validation.error.details[0].message;

            logger.error(`Code (400) | User registration has failed: ${errMsg}`, req);
            res.status(400).json({ success: false, message: errMsg });
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 8);
            let user = new User({ ...{ _id: new mongoose.Types.ObjectId().toString() }, ...req.body });

            try {

                user = await user.save();
                user.password = null; delete user.password;

                logger.success(`Code (200) | User with the email: ${req.body.email} has been created successfully`, req);
                res.json(user);

            } catch (err) {

                let errMsg = err.errorResponse.errmsg;

                logger.error(`Code (400) | User registration has failed: ${errMsg}`, req);
                res.status(400).json({
                    success: false,
                    message: errMsg
                });
            }

        }



    });

export default usersRouter;