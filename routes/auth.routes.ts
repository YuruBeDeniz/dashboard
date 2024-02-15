import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middlewares/jwt.js';

const router = express.Router();



router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if(name === "" || email === "" || password === "") {
        res.status(400).json({ message: "Please provide name, email and a password" });
        return;
    };

    if(password.length < 4) {
        res.status(400).json({ message: "Password has to be minimum 4 characters" });
        return;
    };

    User.findOne({ email })
      .then(foundUser => {
        if(foundUser) {
          res.status(400).json({ message: "User already exist"});
          return;
        };

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        return User.create({ name, email, password: hashedPassword })
                 .then(createdUser => {
                    const { name, email, _id } = createdUser;
                    const user = { name, email, _id};
                    res.status(200).json({ user: user })
                 })
                 .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: "Internal server error"})
                 })
      })
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if(email === "" || password === "") {
        res.status(400).json({ message: "Please provide email and password" });
        return;
    };

    User.findOne({ email })
      .then((foundUser) => {
        if(!foundUser) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
        if(isPasswordCorrect) {
            const { name, _id } = foundUser;
            const payload = { name, _id };

            const authToken = jwt.sign(
                payload,
                process.env.JWT_SECRET as string,
                { algorithm: "HS256", expiresIn: "24h" }
            );
            res.status(200).json({ authToken: authToken });        
        }

        else {
            res.status(401).json({ message: "Unable to authenticate the user" })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" })
      })
});

router.get('/verify', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    console.log("Payload in /verify:", req.payload);
    if (!req.payload) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(req.payload);
});

export default router;
