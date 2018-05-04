import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        balance: {
            type: Number
        },
        passwordHash: { type: String, required: true },
    },
    { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password);
};

schema.methods.setBalance = function setBalance(balance) {
    this.balance = balance;
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
        email: this.email,
        username: this.username,
        balance: this.balance
        },
        'secretkey'
    );
};

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT(),
        username: this.usernamem,
        balance: this.balance
    };
};

export default mongoose.model("User", schema);