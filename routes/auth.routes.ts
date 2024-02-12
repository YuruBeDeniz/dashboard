import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

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

export default router;
