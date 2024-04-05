import mongoose from "mongoose";

const TypeProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        id_category: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
export default mongoose.model('dataTypeProduct', TypeProductSchema)