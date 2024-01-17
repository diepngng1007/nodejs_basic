import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
    }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export default mongoose.model("dataProduct", ProductSchema)