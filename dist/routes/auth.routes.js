"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../middlewares/jwt");
const router = express_1.default.Router();
router.post("/signup", (req, res, next) => {
    const { name, email, password } = req.body;
    if (name === "" || email === "" || password === "") {
        res.status(400).json({ message: "Please provide name, email and a password" });
        return;
    }
    ;
    if (password.length < 4) {
        res.status(400).json({ message: "Password has to be minimum 4 characters" });
        return;
    }
    ;
    User_1.default.findOne({ email })
        .then(foundUser => {
        if (foundUser) {
            res.status(400).json({ message: "User already exist" });
            return;
        }
        ;
        const salt = bcryptjs_1.default.genSaltSync();
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        return User_1.default.create({ name, email, password: hashedPassword })
            .then(createdUser => {
            const { name, email, _id } = createdUser;
            const user = { name, email, _id };
            res.status(200).json({ user: user });
        })
            .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
    });
});
router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    if (email === "" || password === "") {
        res.status(400).json({ message: "Please provide email and password" });
        return;
    }
    ;
    User_1.default.findOne({ email })
        .then((foundUser) => {
        if (!foundUser) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const isPasswordCorrect = bcryptjs_1.default.compareSync(password, foundUser.password);
        if (isPasswordCorrect) {
            const { name, _id } = foundUser;
            const payload = { name, _id };
            const authToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "24h" });
            res.status(200).json({ authToken: authToken });
        }
        else {
            res.status(401).json({ message: "Unable to authenticate the user" });
        }
    })
        .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    });
});
router.get('/verify', jwt_1.isAuthenticated, (req, res, next) => {
    console.log("Payload in /verify:", req.payload); // Debugging statement
    if (!req.payload) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(req.payload);
});
exports.default = router;
