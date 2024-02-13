"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please provide name!"],
    },
    password: {
        type: String,
        minlength: 4,
        required: [true, "Please provide password!"],
    },
    email: {
        type: String,
        unique: true,
    }
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
