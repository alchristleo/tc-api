import express from 'express';
import rp from 'request-promise';
import CoinMarketCap  from 'coinmarketcap-api';
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
        client.getTicker({start: 0, limit: 100})
        .then(results => res.json({
                cryptos: results.map(function(item){
                        return {
                                id: item.id,
                                name: item.name,
                                price_btc: item.price_btc,
                                price_usd: item.price_usd,
                                percent_change_24h: item.percent_change_24h,
                                symbol: item.symbol                                
                        }
                })
        }))
        .catch(console.error)
});

router.get("/bitcoin-price", (req, res) => {
        client.getTicker({start: 0, limit: 1})
        .then(results => res.json({
                cryptos: results.map(function(item){
                        return {
                                id: item.id,
                                name: item.name,
                                price_btc: item.price_btc,
                                price_usd: item.price_usd,
                                percent_change_24h: item.percent_change_24h,
                                symbol: item.symbol                                
                        }
                })
        }))
        .catch(console.error)
});

export default router;

