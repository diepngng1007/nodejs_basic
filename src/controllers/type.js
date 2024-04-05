import Type from "../models/Type";

export const getAllType = async (req, res) => {
  try {
    const data = await Type.find();
    if (data && data.length > 0) {
      return res.status(200).json({
        messages: "Lấy type thành công",
        data,
      });
    }
    return res.status(404).json({
      messages: "ko tìm thấy type",
    });
  } catch (error) {
    return res.status(500).json({
      messages: error.messages,
    });
  }
};

export const getOneType = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Type.find({ _id: id });
    if (data.length > 0) {
      return res.status(200).json({
        messages: "lấy 1 type thành công",
        data,
      });
    }
    return res.status(404).json({
      messages: "ko tìm thấy type",
    });
  } catch (error) {
    return res.status(500).json({
      messages: error.messages,
    });
  }
};

export const addType = async (req, res) => {
  try {
    const data = await Type.create(req.body);
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

export const deleteType = async (req, res) => {
  try {
    const data = await Type.findByIdAndDelete({
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

export const updateType = async (req, res) => {
  try {
    const data = await Type.findByIdAndUpdate(req.params.id, req.body);
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
