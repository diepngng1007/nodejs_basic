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
        products: [],
    },
    {
        timestamps: true,
        versionKey: false

    }
)

// id 
// Bánh kem su 
// banh-kem-su

export default mongoose.model("dataCategory", CategorySchema)