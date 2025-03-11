import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extending the Request interface as Property 'userId' does not exist on type 'Request
declare module "express" {
    interface Request {
        userId?: string; // Add userId as an optional property
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET || "your_default_secret",
        (err, decoded: any) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Failed to authenticate token" });
            }
            req.userId = decoded.userId; // Add userId to request object
            next();
        }
    );
}

// export default verifyToken; // The middleware can be exported in this way too
