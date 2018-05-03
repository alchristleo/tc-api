import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Promise from 'bluebird';

import auth from './routes/auth';

const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/tokocrypto");

app.use('/api/auth', auth);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(6969, () => console.log("Running on localhost: 6969"));