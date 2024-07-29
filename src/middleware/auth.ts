import Jwt from "jsonwebtoken";

import logger from "../logger";

export default function auth(req, res, next) {

    Jwt.verify(req.headers['x-auth-token'], process.env.JWT_SECRET, (err, user) => {

        if (err) {
            logger.error(`Code 401 | Client is not autherized to make this request`, req);
            res.status(401).json({ success: false, message: "Unautherized" })
        } else {
            req.user = user;
            next();
        }

    });

}


