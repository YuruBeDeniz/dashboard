const { Schema, model } = require("mongoose");

const userSchema = new Schema (
    {
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
    },
    {
        timestamps: true,
    } 
);

const User = model("User", userSchema);

module.exports = User;