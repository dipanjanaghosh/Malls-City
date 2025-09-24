import mongoose from "mongoose";
import logger from "../appLogger";

export const dbConnect = () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        logger.error(
            "FATAL ERROR: MONGO_URI is not defined in the environment variables."
        );
        process.exit(1); // Exit the application if the database string is not found
    }

    mongoose.connect(mongoUri).then(
        () => logger.info("Database connection successful."),
        (error) => logger.error(error)
    );
};
