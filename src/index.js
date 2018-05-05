import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Promise from 'bluebird';

import auth from './routes/auth';
import users from './routes/users';
import cryptos from './routes/cryptos';
import transactions from './routes/transactions';

const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/tokocrypto");

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use("/api/cryptos", cryptos);
app.use("/api/transactions", transactions);
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(6969, () => console.log("Running on localhost: 6969"));