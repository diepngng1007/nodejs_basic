import mongoose from "mongoose";
const BlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true
    }
})

export default mongoose.model('BlackList', BlackListSchema)