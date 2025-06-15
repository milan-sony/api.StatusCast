import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        emoji: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Status = mongoose.model('Status', statusSchema);

export default Status;