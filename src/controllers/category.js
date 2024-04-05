import Category from "../models/Category";
import { categoryValid } from "../validation/categoryValid";
export const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find();
    if (data && data.length) {
      return res.status(200).json({
        message: "lấy danh mục thành công",
        data,
      });
    }
    return res.status(204).json({
      message: "ko tìm thấy danh mục nào",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.find({ _id: id });
    console.log(data);
    if (data.length > 0) {
      return res.status(200).json({
        message: "lay danh muc thanh cong",
        data,
      });
    }

    return res.status(400).json({
      message: "Khong tim thay san pham!",
    });
  } catch (error) {
    return res.status(500).json({
        message: error.message,
      });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!data) {
      return res.status(204).json({
        message: "ko tìm thấy danh mục",
      });
    }
    return res.status(200).json({
      message: "xóa thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { error } = categoryValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors.join(","),
      });
    }

    const data = await Category.create(req.body);

    if (!data) {
      return res.status(204).json({
        message: "ko tìm thấy danh mục sp",
      });
    }
    return res.status(200).json({
      message: "thêm danh mục sp thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error } = categoryValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors.join(","),
      });
    }
    const response = await Category.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!response) {
      return res.status(204).json({
        message: "ko tìm thấy sp",
      });
    }
    return res.status(200).json({
      message: "cập nhật danh mục thành công",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneCategoryBySlug = async (req, res) => {
  try {
    const data = await Category.findOne({ slug: req.query.slug });
    if (!data) {
      return res.status(204).json({
        message: "ko tìm thấy danh mục",
      });
    }
    return res.status(200).json({
      message: "lấy danh mục theo tên thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneCategoryById = async (req, res) => {
  try {
    const data = await Category.find({ _id: req.params.id });
    if (!data) {
      return res.status(204).json({
        message: "ko tim thấy danh mục",
      });
    }
    return res.status(200).json({
      message: "lấy danh mục theo id thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneCategoryByName = async (req, res) => {
  try {
    const categoryName = req.query.name;
    const query = {
      name: { $regex: new RegExp(categoryName, "i") },
    };
    const data = await Category.findOne(query);
    if (!data) {
      return res.status(204).json({
        message: "ko tìm thấy danh mục",
      });
    }
    return res.status(200).json({
      message: "lấy danh mục theo tên thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
