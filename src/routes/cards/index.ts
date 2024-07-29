import express from "express";

import { auth, isBusiness } from "../../middleware";
import { Card } from "../../db/models";
import { cardSchema } from "../../validations/schemas";
import logger from "../../logger";

export const cardsRouter = express.Router();


cardsRouter.route('/').
    get(async (req, res) => {
        logger.success("Code 200 | Cards have been retrieved successfully", req);
        res.json(await Card.find({}));
    }).
    post(auth, isBusiness, async (req: any, res) => {


        const validation = cardSchema.validate(req.body);
        req.body.userId = req.user._id;
        req.body.bizNumber = Math.floor(1000000 + Math.random() * 9999999);

        if (validation.error) {

            let errMsg = validation.error.details[0].message;

            logger.error(`Code (400) | Card creation has failed: ${errMsg}`, req);

            res.status(400).json({ success: false, message: errMsg });

        } else {
            let card = new Card(req.body);

            
            card.save();
            
            logger.success("Code 200 | Card has been created successfully", req);
            res.json(card);
        }


    });

export default cardsRouter;