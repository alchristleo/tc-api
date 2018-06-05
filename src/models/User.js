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
        confirmed: { type: Boolean, default: false },
        confirmationToken: { type: String, default: "" },
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

schema.methods.setConfirmationToken = function setConfirmationToken(token) {
    this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
            email: this.email,
            username: this.username,
            balance: this.balance,
            confirmed: this.confirmed
        },
        process.env.SECRET_KEY
    );
};

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT(),
        username: this.usernamem,
        balance: this.balance,
        confirmed: this.confirmed
    };
};

export default mongoose.model("User", schema);