import express from "express";

import { Card } from "../../db/models";
import { auth } from "../../middleware";
import logger from "../../logger";
import { cardUpdateSchema } from "../../validations/schemas";


export const cardRouter = express.Router();

cardRouter.route('/:_id').
    get(async (req: any, res, next) => {


        let { _id } = req.params;

        if (_id == "my-cards") {
            next();
            return;
        }

        let card = await Card.findById(_id);

        if (card) {
            logger.success("Code 200 | Card information has been retrieved successfully", req);
            res.json(card);
        } else {
            logger.error("Code 400 | Card doesn't exist", req);
            res.json({
                success: false,
                message: "Card doesn't exist"
            });
        }
    }).
    put(auth, async (req: any, res) => {

        let { _id } = req.params;

        if ((req.user.isAdmin || (await Card.findById(_id))?.userId == req.user._id)) {


            const validation = cardUpdateSchema.validate(req.body);

            if (validation.error) {


                let errMsg = validation.error.details[0].message;

                logger.error(`Code (400) | Card update has failed: ${errMsg}`, req);
                res.status(400).json({ success: false, message: errMsg });

            }
            else {
                let card = await Card.findByIdAndUpdate(_id, req.body);

                if (card) {
                    card = await Card.findById(_id);

                    logger.success("Code 200 | Card was updated successfully", req);
                    res.json(card);
                } else {
                    logger.error("Code 400 | Card doesn't exist", req);
                    res.status(400).json({ success: false, message: "Card doesn't exist" })
                }
            }


        } else {

            logger.error("Code 403 | User is nor admin or the creator of the card", req);
            res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }
    }).
    patch(auth, async (req: any, res) => {

        let { _id } = req.params;


        try {
            let card = await Card.findById(_id);

            if (card) {


                if (card.likes.includes(req.user._id)) {
                    await Card.findByIdAndUpdate(_id, { $pull: { likes: req.user._id } });

                } else {
                    await Card.findByIdAndUpdate(_id, { $push: { likes: req.user._id } });
                }
                card = await Card.findById(_id);
                logger.success("Code 200 | Card has been liked", req);
                res.json(card);

            } else {
                logger.error("Code 400 | Card doesn't exist", req);
                res.status(400).json({ success: false, message: "Card doesn't exist" })
            }
        } catch (error) { }
    }).
    delete(auth, async (req: any, res) => {
        let { _id } = req.params;


        if ((req.user.isAdmin || (await Card.findById(_id))?.userId == req.user._id)) {

            try {

                let card = await Card.findByIdAndDelete(_id);

                if (card) {
                    logger.success("Code 200 | Card has been deleted successfully", req);
                    res.json(card);

                } else {
                    logger.error("Code 400 | Card doesn't exist", req);
                    res.status(400).json({ success: false, message: "Card doesn't exist" })
                }
            }
            catch (err) { }
        } else {
            logger.error("Code 403 | User is nor admin or the creator of the card", req);
            res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }



    });

export default cardRouter;