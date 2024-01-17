import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        products: [],
    },
    {
        timestamps: true,
        versionKey: false

    }
)

export default mongoose.model("dataCategory", CategorySchema)