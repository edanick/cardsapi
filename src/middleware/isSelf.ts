import logger from "../logger";

export default function isSelf(req, res, next) {
    if (req.user._id == req.params._id) { next(); } else {

        logger.error(`Code 403 | Client doesn't have proper autherization level to make this request`, req);


        res.status(403).json({
            success: false,
            message: "Forbidden"
        });
    }
}