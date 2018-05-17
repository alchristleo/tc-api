import express from 'express';
import request from 'request-promise';
import authenticate from '../middlewares/authenticate';
import Transaction from '../models/Transaction';
import parseErrors from '../utils/parseErrors';

const router = express.Router();
router.use(authenticate);

router.get("/", (req, res) => {
	Transaction.find({ userId: req.currentUser._id })
		.then(transactions => res.json({ transactions }))
});

router.post("/", (req, res) => {
	Transaction.create({ ...req.body.transaction, userId: req.currentUser._id })
		.then(transaction => res.json({ transaction }))
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;