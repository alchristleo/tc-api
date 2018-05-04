import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.post("/", (req, res) => {
    const { email, password, username } = req.body.user;
    const user = new User({ email, username });
    user.setBalance(10000000);
    user.setPassword(password);
    user
    .save()
    .then(userRecord => {
        res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.get("/current_user", authenticate, (req, res) => {
    res.json({
        user: {
            email: req.currentUser.email,
            username: req.currentUser.username,
            balance: req.currentUser.balance
        }
    });
});

export default router;