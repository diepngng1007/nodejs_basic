import Product from "../models/Product";
import { productValid } from "../validation/productValid";

// export const getProductWithSize = async (req, res) => {
//   try {
//     const id = req.params.id
//     const product = await Product.findById(id).populate('size')
//     if(!product){
//       return res.status(404).json({
//         message: "Khong tim thay san pham nao!",
//       });
//     }
//     return res.status(200).json({
//       message: "Lay danh sach san pham thanh cong!",
//       data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       // message: "Loi server",
//       message: error.name || "loi server",
//     });
//   }
// }  

export const getAllProduct = async (req, res) => {
  try {
    // const data = await Product.find().populate("size");

    // if (data && data.length) {
    //   return res.status(200).json({
    //     message: "Lay danh sach san pham thanh cong!",
    //     data,
    //   });
    // }
    const page = Number(req.query?.page)
    const limit = Number(req.query?.limit) || 2
    const count = await Product.countDocuments()
    const skip = (page - 1) * limit;
    const data = await Product
    .find({})
    .populate("size")
    .skip(skip)
    .limit(limit)
    if(data && data.length){
      return res.status(200).json({
        message: "Lay san pham thanh cong",
        data,
        count,
        page,
        limit,
      })
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
    const data = await Product.find({ _id: id }).populate('size');
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
    const id = req.params.id_product;
    const response = await Product.findByIdAndDelete(id);
    if (!response) {
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

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const deteleAllProduct = async (req, res) => {
  try {
      await Product.deleteMany({})
      return res.status(200).json({
        message: "xoas thanh cong"
      })
  } catch (error) {
    return res.status(500).json({
      message: "lỗi server"
    })
  }
}

export const postProduct = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body, { abortEarly: false })
    if(error){
        const errors = error.details.map((err) => err.message)
        return res.status(400).json({
            message: errors.join(",")
        })
    }
    const data = await Product.create(req.body)
    console.log('data', data)
    if(!data){
        return res.status(400).json({
            message: "thêm sản phẩm thất bại"
        })
    }
    return res.status(200).json({
        message: "thêm sản phẩm thành công",
        data
    })
  } catch (error) {
    console.log(11, error)
    return res.status(500).json({
        message: "Lỗi server"
    })
}
};

export const updateProduct = async (req, res) => {
  try {
    // const { error } = productValid.validate(req.body, { abortEarly: false })
    // if(error){
    //     const errors = error.details.map((err) => err.message)
    //     return res.status(400).json({
    //         message: errors.join(",")
    //     })
    // }
    const data = await Product.findByIdAndUpdate(req.params.id_product, req.body)
    if(!data){
        return res.status(400).json({
            message: "cập nhật sản phẩm thất bại"
        })
    }
    return res.status(200).json({
        message: "cập nhật sản phẩm thành công",
        data
    })
  } catch (error) {
    return res.status(500).json({
        message: "Lỗi server"
    })
}
};

export const getProductByCategory = async (req, res) => {
  try {
    const category = req.params.id_category
    console.log(category)
    const data = await Product.find({ id_category: category})
    console.log(data)
    if(data && data.length){
      return res.status(200).json({
        message: "Lấy sản phẩm theo danh mục thành công",
        data
      })
    }
    return res.status(400).json({
      message: "ko tìm thấy danh mục nào"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server"
    })
  }
}
export const SearchProductByName = async (req, res) => {
  try {
    const encodedSlug = req.query.name;
    const regex = new RegExp(encodedSlug, "i");

    const data = await Product.find({ name: { $regex: regex } });

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm với name đã cung cấp"
      });
    }

    res.status(200).json({
      message: "Tìm kiếm sản phẩm theo tên sp thành công",
      response: data
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name || "Lỗi server"
    });
  }
};
