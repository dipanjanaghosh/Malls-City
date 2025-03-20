import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const logger = require("../appLogger");

// Extending the Request interface as Property 'userId' does not exist on type 'Request
declare module "express" {
    interface Request {
        userId?: string; // Add userId as an optional property
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
        logger.error(
            `verifyToken::No token provided for ${JSON.stringify(req.headers)}`
        );
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET || "your_default_secret",
        (err, decoded: any) => {
            if (err) {
                logger.error(`verifyToken::Failed to authenticate token`);

                return res
                    .status(403)
                    .json({ message: "Failed to authenticate token" });
            }
            req.userId = decoded.userId; // Add userId to request object
            logger.info(
                `verifyToken:tokken is valid ${JSON.stringify(decoded)}`
            );
            next();
        }
    );
}

// export default verifyToken; // The middleware can be exported in this way too
