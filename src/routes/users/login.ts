import express from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

import { loginSchema } from "../../validations/schemas";
import User from "../../db/models/user";
import logger from "../../logger";

export const loginRouter = express.Router();

loginRouter.route('/').
    post(async (req, res) => {

        User.findOne({ email: req.body.email }).then((user) => {


            const validation = loginSchema.validate(req.body);

            if (validation.error) {

                let errMsg = validation.error.details[0].message;

                logger.error(`Code (400) | User authenication has failed: ${errMsg}`, req);
                res.status(400).json({ success: false, message: errMsg });

            } else {

                if (bcrypt.compareSync(req.body.password, user.password)) {
                    user.password = null; delete user.password;

                    let userObject = {
                        _id: user._id,
                        isAdmin: user.isAdmin,
                        isBusiness: user.isBusiness
                    };

                    logger.success(`Code (200) | User with the email: ${user.email} authenication success`);
                    res.send(Jwt.sign(userObject, process.env.JWT_SECRET));

                } else {

                    logger.error(`Code (400) | User authenication has failed: wrong email or password`, req);
                    res.status(400).json({
                        success: false,
                        message: "Authenication failed: wrong email or password"
                    });

                }

            }
        });


    });

export default loginRouter;