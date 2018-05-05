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
    },
    { timestamps: true }
);

export default mongoose.model('Transaction', schema)