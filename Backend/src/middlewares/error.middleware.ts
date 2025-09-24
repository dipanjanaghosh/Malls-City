import { Request, Response, NextFunction } from "express";
import logger from "../appLogger";

// A simple interface for our application errors.
interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Log the full error for debugging purposes using your existing logger.
    logger.error(err.stack || err.message);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: "error",
        statusCode: statusCode,
        message:
            // If in production, do not expose the full error message.
            statusCode === 500 && process.env.NODE_ENV === "production"
                ? "An internal server error occurred."
                : err.message,
    });
};
