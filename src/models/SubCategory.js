import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        // id_subcategory: {
        //     type: String,
        //     // required: true
        // },
        id_type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
export default mongoose.model('dataSubCategory', SubCategorySchema)