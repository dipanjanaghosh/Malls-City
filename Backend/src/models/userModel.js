const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
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

exports.UserModel = mongoose.model("user", userSchema);
// module.exports = UserModel;
