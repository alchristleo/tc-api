import express from 'express';
import rp from 'request-promise';
import CoinMarketCap from 'coinmarketcap-api';
const client = new CoinMarketCap()
const router = express.Router();

router.get("/", (req, res) => {
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

router.get("/kurs", (req, res) => {
        rp({
                url: 'http://free.currencyconverterapi.com/api/v5/convert?q=USD_IDR&compact=y'
        }).pipe(res);
});

export default router;

