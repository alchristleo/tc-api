import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import authenticate from "../middlewares/authenticate";
import { sendConfirmationEmail } from '../mailer';

const router = express.Router();

router.post("/", (req, res) => {
    const { email, password, username } = req.body.user;
    User.findOne({ email: email }).then(user => {
        if (user) {
            res.status(400).json({ errors: { global: "This username has been taken" } });
        } else {
            const user = new User({ email, username });
            user.setConfirmationToken();
            user.setBalance(10000000);
            user.setPassword(password);
            user
                .save()
                .then(userRecord => {
                    sendConfirmationEmail(userRecord);
                    res.json({ user: userRecord.toAuthJSON() });
                })
                .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
        }
    })
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