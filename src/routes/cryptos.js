import express from 'express';
import rp from 'request-promise';
import CoinMarketCap from 'coinmarketcap-api';
import Crypto from '../models/Crypto';
import parseErrors from '../utils/parseErrors';
//import authenticate from '../middlewares/authenticate';
const client = new CoinMarketCap()
const router = express.Router();
//router.use(authenticate);

router.get("/", (req, res) => {
        // rp('https://api.coinmarketcap.com/v2/ticker/?start=1&limit=100')
        // .then(results => res.json({
        //         id: results.data['*']    
        // }))
        // .catch(err => console.log(err));
        client.getTicker({ start: 0, limit: 100 })
                .then(results => res.json({
                        cryptos: results.map(function (item) {
                                return {
                                        id: item.id,
                                        name: item.name,
                                        market_cap_usd: item.market_cap_usd,
                                        price_btc: item.price_btc,
                                        price_usd: item.price_usd,
                                        percent_change_24h: item.percent_change_24h,
                                        symbol: item.symbol,
                                        rank: item.rank,
                                        last_updated: item.last_updated
                                }
                        })
                }))
                .catch(console.error)
});

router.get("/infobox-ticker", (req, res) => {
        client.getTicker({ start: 0, limit: 100 })
                .then(results => res.json({
                        cryptos: results.map(function (item) {
                                return item
                        })
                }));
})

// router.post("/", (req, res) => {
// 	Crypto.create({ crypto, userId: req.currentUser._id })
// 		.then(crypto => res.json({ crypto }))
// 		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
// });

router.get("/bitcoin-price", (req, res) => {
        client.getTicker({ start: 0, limit: 1 })
                .then(results => res.json({
                        cryptos: results.map(function (item) {
                                return {
                                        id: item.id,
                                        name: item.name,
                                        market_cap_usd: item.market_cap_usd,
                                        price_btc: item.price_btc,
                                        price_usd: item.price_usd,
                                        percent_change_24h: item.percent_change_24h,
                                        symbol: item.symbol,
                                }
                        })
                }))
                .catch(console.error)
});

router.get("/current-crypto", (req, res) => {
        client.getTicker({ start: 0, limit: 100 })
                .then(results => res.json({
                        cryptos: results.map(function (item) {
                                return {
                                        id: item.id,
                                        name: item.name,
                                        market_cap_usd: item.market_cap_usd,
                                        price_btc: item.price_btc,
                                        price_usd: item.price_usd,
                                        percent_change_24h: item.percent_change_24h,
                                        symbol: item.symbol,
                                        rank: item.rank
                                }
                        })
                }))
                .catch(console.error)
});

export default router;

