import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post("/", (req, res) => {
    const { email, password, username } = req.body.user;
    const user = new User({ email, username });
    user.setPassword(password);
    user
    .save()
    .then(userRecord => {
        res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: err.errors }));
});

export default router;