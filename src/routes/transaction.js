import express from 'express';
import Transaction from '../models/Transaction';
import parseErrors from '../utils/parseErrors';

const router = express.Router();

router.post("/", (req, res) => {
	Transaction.create({ transaction, userId: req.currentUser._id })
		.then(transaction => res.json({ transaction }))
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;