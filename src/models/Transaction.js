import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        cryptocur: {
            type: String,
            required: true
        },
        totalidr: {
            type: Number,
            required: true,
        },
        totalget: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true }
    },
    { timestamps: true }
);

export default mongoose.model('Transaction', schema)