import express from 'express';
import rp from 'request-promise';
//import authenticate from '../middlewares/authenticate';

const router = express.Router();
//router.use(authenticate);

router.get("/", (req, res) => {
	rp('https://api.coinmarketcap.com/v2/ticker/?start=1&limit=100')
        .then(results => res.json({results}))
        .catch(err => console.log(err));
});

export default router;

