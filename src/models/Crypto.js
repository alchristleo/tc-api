import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	market_cap_usd: { type: Number, required: true },
	price_btc: { type: Number, required: true },
	price_usd: { type: Number, required: true },
	percent_change_24h: { type: Number, required: true },
	symbol: { type: String, required: true },
	rank: { type: Number, required: true },
	last_updated: { type: Date, required: true }
});

export default mongoose.model('Crypto', schema)