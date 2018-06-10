import express from 'express';
import User from '../models/User';
import { sendResetPasswordEmail } from '../mailer';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/", (req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email }).then(user => {
        if (user && user.isValidPassword(credentials.password)) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({ errors: { global: "Invalid credentials" } });
        }
    });
});

router.post("/confirmation", (req, res) => {
    const token = req.body.token;
    User.findOneAndUpdate(
        { confirmationToken: token },
        { confirmationToken: "", confirmed: true },
        { new: true }
    ).then(
        user =>
            user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
    );
});

router.post("/forgot_password", (req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email }).then(user => {
        if (user) {
            sendResetPasswordEmail(user);
            res.json({});
        } else {
            res.status(400).json({ errors: { global: "Email not registered!" } });
        }
    })
});

router.post("/validate_token", (req, res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, err => {
        if (err) {
            res.status(401).json({ errors: { global: err.message } });
        } else {
            res.json({});
        }
    })
});

router.post("/reset_password", (req, res) => {
    const { newPassword, token } = req.body.data;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ errors: { global: "Token invalid, please try again later" } });
        } else {
            User.findOne({ _id: decoded._id }).then(user => {
                if (user) {
                    user.setPassword(newPassword);
                    user.save().then(() => res.json({}));
                } else {
                    res.status(404).json({ errors: { global: "Token invalid, please try again later" } })
                }
            })
        }
    })
});

export default router;