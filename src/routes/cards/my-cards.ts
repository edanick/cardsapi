import express from "express";

import { auth, isSelf } from "../../middleware";
import { Card } from "../../db/models";
import logger from "../../logger";

export const myCardsRouter = express.Router();

myCardsRouter.route('/').
    get(auth, async (req: any, res) => {
        logger.success("Code 200 | User cards have been retrived successfully", req);
        res.json(await Card.find({ userId: req.user._id }));
    });

export default myCardsRouter;