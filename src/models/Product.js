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
    },
    quantity: {
      type: Number,
      required: true
    },
    id_type: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
    },
    size: [{ 
      type:  mongoose.Types.ObjectId, ref: "dataSizeProduct"
    }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("dataProduct", ProductSchema);
