import express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";

import User from "../../db/models/user";
import isAdminOrSelf from "../../middleware/isAdminOrSelf";
import isSelf from "../../middleware/isSelf";
import auth from "../../middleware/auth";
import { userUpdateSchema } from "../../validations/schemas";
import logger from "../../logger";

export const userRouter = express.Router();



userRouter.route('/:_id').
    get(auth, isAdminOrSelf, async (req, res) => {

        let { _id } = req.params;

        try {
            let user = await User.findById(_id);

            if (user) {
                user.password = null; delete user.password;

                logger.success("Code 200 | User information was retrieved successfully", req);
                res.json(user);
            } else {
                logger.error(`Code 400 | User doesn't exist`, req);
                res.status(400).json({
                    success: false,
                    message: `User doesn't exist`
                });
            }
        } catch (err) { }

    }).
    put(auth, isSelf, async (req, res) => {


        const validation = userUpdateSchema.validate(req.body);

        if (validation.error) {


            let errMsg = validation.error.details[0].message;

            logger.error(`Code (400) | User update has failed: ${errMsg}`, req);
            res.status(400).json({ success: false, message: errMsg });

        } else {

            if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 8);

            let user = await User.findByIdAndUpdate(req.params._id, req.body);

            if (user) {
                user = await User.findById(req.params._id);

                logger.success("Code 200 | User information was updated successfully", req);
                res.json(user);
            } else {
                logger.error("Code 400 | User doesn't exist", req);
                res.status(400).json({
                    success: false,
                    message: "User doesn't exist"
                });
            }

        }
    }).
    patch(auth, isSelf, async (req, res) => {

        let validation = Joi.object<any>({ isBusiness: Joi.boolean().required() }).validate(req.body);

        if (validation.error) {
            let errMsg = validation.error.details[0].message;

            logger.error(`Code (400) | User isBusiness patch has failed: ${errMsg}`, req);
            res.status(400).json({ success: false, message: errMsg });
        } else {
            try {

                let user = await User.findByIdAndUpdate(req.params._id, { isBusiness: req.body.isBusiness });

                if (user) {
                    user = await User.findById(req.params._id);
                   
                    logger.success("Code 200 | User isBuisness flag has changed successfully", req);
                    res.json(user);
                } else {

                    logger.error("Code 400 | User doesn't exist", req);
                    res.status(400).json({
                        success: false,
                        message: "User doesn't exist"
                    });
                }


            } catch (err) {
                logger.error("Code 400 | Failed to update user", req);
            }
        }


    }).
    delete(auth, isAdminOrSelf, async (req, res) => {
        let { _id } = req.params;

        try {

            let user = await User.findByIdAndDelete(_id);

            if (user) {
                logger.success("Code 200 | User has been deleted successfully", req);
                res.json(user);
            } else {
                logger.error("Code 400 | User doesn't exist", req);
                res.status(400).json({
                    success: false,
                    message: "User doesn't exist"
                });
            }


        } catch (err) { }

    });

export default userRouter;