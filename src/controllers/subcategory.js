import SubCategory from "../models/SubCategory";

export const getAllSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.find();
    if (data && data.length > 0) {
      return res.status(200).json({
        messages: "Lấy danh mục con thành công",
        data,
      });
    }
    return res.status(404).json({
      messages: "ko tìm thấy danh mục con",
    });
  } catch (error) {
    return res.status(500).json({
      messages: error.messages,
    });
  }
};

export const getOneSubCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await SubCategory.find({ _id: id });
    if (data.length > 0) {
      return res.status(200).json({
        messages: "lấy 1 danh mục con thành công",
        data,
      });
    }
    return res.status(404).json({
      messages: "ko tìm thấy danh mục con nào",
    });
  } catch (error) {
    return res.status(500).json({
      messages: error.messages,
    });
  }
};

export const addSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.create(req.body);
    if (!data) {
      return res.status(404).json({
        messages: "thêm thất bại",
      });
    }
    return res.status(200).json({
      messages: "thêm thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      messages: error.messages,
    });
  }
};

export const deleteSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!data) {
      return res.status(404).json({
        messages: "xóa thất bại",
      });
    }
    res.status(200).json({
      messages: "xóa thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      messages: error.messages,
    });
  }
};

export const updateSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.findByIdAndUpdate(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({
        messages: "cập nhật thất bại",
      });
    }
    return res.status(200).json({
      messages: "cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      messages: error.messages,
    });
  }
};
