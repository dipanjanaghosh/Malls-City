// const mongoose = require("mongoose");
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const logger = require("../appLogger");

export interface User {
    name: string;
    password: string;
    email: string;
    username: string;
}

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        // role: {
        //     type: String,
        //     enum: ['admin', 'user'],
        //     default: 'user',
        // }
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        if (error instanceof Error) {
            return next(error);
        } else {
            // Handle the case where error is not an Error object
            logger.error(`userSchema.pre::Error hashing password: ${error}`); // Log the error
            console.error("Unexpected error type:", error);
            return next(new Error("An unexpected error occurred.")); // Create a new Error
        }
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export const userModel = model<User>("user", userSchema);
// exports.UserModel = mongoose.model("user", userSchema);
// module.exports = UserModel;
