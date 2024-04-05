import mongoose from "mongoose";

const SizeProductScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('dataSizeProduct', SizeProductScheme)