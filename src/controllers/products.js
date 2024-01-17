import Product from "../models/Product";
import { productValid } from "../validation/productValid";


export const getAllProduct = async (req, res) => {
  try {
    const data = await Product.find();

    if (data && data.length) {
      return res.status(200).json({
        message: "Lay danh sach san pham thanh cong!",
        data,
      });
    }

    return res.status(204).json({
      message: "Khong tim thay san pham nao!",
    });
  } catch (error) {
    return res.status(500).json({
      // message: "Loi server",
      message: error.name || "loi server",
    });
  }
};

export const getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.find({ _id: id });
    console.log(data);
    if (data.length > 0) {
      return res.status(200).json({
        message: "lay san pham thanh cong",
        data,
      });
    }

    return res.status(204).json({
      message: "Khong tim thay san pham!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name || "loi server",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Product.findByIdAndDelete(id);
    if(!response){
      return res.status(400).json({
        message: "ko tìm thấy để xóa"
      })
    }
    return res.status(200).json({
      message: "Xoa thanh cong",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.name || "loi server",
    });
  }
};


export const postProduct = async (req, res) => {
  try {
    const data = req.body;
    const { error } = productValid.validate(req.body,{
      abortEarly: false,
    });
    const newProduct = new Product({
      data: data
    });
    if(error){
        const errors = error.details.map((err) => err.message);
        return res.status(204).json({
          message: errors.join(",")
        })
    }
    const response = await newProduct.save();
    if(!response){
       return res.status(204).json({message: "ko tim thay sp"})
    }
    return res.status(200).json({
      message: "them thanh cong"
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.name || "loi server",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    if(error){
      const errors = error.details.map((err) => err.message);
      return res.status(204).json({
        message: errors.join(",")
      })
  }
  const response = await Product.findByIdAndUpdate(id,data)
    if(!response){
      return res.status(204).json({message: "ko tim thay sp"})
    }
    res.status(200).json({
      message: "cap nhat thanh cong"
    })
  } catch (error) {
   return res.status(500).json({
    message: error.name || "loi server",
   })
  }
};
