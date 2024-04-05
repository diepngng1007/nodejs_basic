import Size from "../models/Size";

export const getAllSize = async (req, res) => {
    try {
        const data = await Size.find()
        if(data && data.length > 0){
            return res.status(200).json({
                messages: "lấy size thành công",
                data,
            })
        }
        return res.status(404).json({
            messages: "ko tìm thấy size"
        })
    } catch (error) {
        return res.status(500).json({
            messages: error.messages,
          });
    }
}

export const getOneSize = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Size.find({ _id: id })
        if(data.length > 0){
            res.status(200).json({
                messages: "lấy 1 size thành công",
                data,
            })
        }
        res.status(404).json({
            messages: "ko tìm thấy size"
        })
    } catch (error) {
        return res.status(500).json({
            messages: error.messages,
          });
    }
}

export const addSize = async (req, res) => {
    try {
        const data = await Size.create(req.body)
        if(!data){
            return res.status(404).json({
                messages: "thêm thất bại"
            })
        }
        return res.status(200).json({
            messages: "thêm thành công",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            messages: error.messages,
          });
    }
}

export const deleteSize = async (req, res) => {
    try {
        const data = await Size.findByIdAndDelete({
            _id: req.params.id
        })
        if(!data){
            return res.status(404).json({
                messages: "xóa thất bại"
            })
        }
        res.status(200).json({
            messages: "xóa thành công", 
            data,
        })
    } catch (error) {
        return res.status(500).json({
            messages: error.messages,
          });
    }
}

export const updateSize = async (req, res) => {
    try {
        const data = await Size.findByIdAndUpdate(req.params.id, req.body)
        if(!data){
            return res.status(404).json({
                messages: "cập nhật thất bại"
            })
        }
        return res.status(200).json({
            messages: "cập nhật thành công",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            messages: error.messages,
          });
    }
}