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


export const postProduct = async (req, res) => {
  try {
    console.log(1)
    const { error } = productValid.validate(req.body, { abortEarly: false })
    if(error){
        const errors = error.details.map((err) => err.message)
        return res.status(400).json({
            message: errors.join(",")
        })
    }
    console.log(2);
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
    const { error } = productValid.validate(req.body, { abortEarly: false })
    if(error){
        const errors = error.details.map((err) => err.message)
        return res.status(400).json({
            message: errors.join(",")
        })
    }
    const data = await Product.findByIdAndUpdate(req.params.id, req.body)
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

export const SearchProductByName = async (req, res) => {
  try {
    const encodedSlug = encodeURIComponent(req.query.slug);

    const data = await Product.findOne({ slug: encodedSlug });

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm với slug đã cung cấp"
      });
    }

    res.status(200).json({
      message: "Tìm kiếm sản phẩm theo slug thành công",
      response: data
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name || "Lỗi server"
    });
  }
};
