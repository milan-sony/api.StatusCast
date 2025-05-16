import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Status = mongoose.model('Status', statusSchema)

export default Status