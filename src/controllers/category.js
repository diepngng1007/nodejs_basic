import Category from "../models/Category";

export const getAllCategory = async (req, res) => {
    try {
        const data = await Category.find()
        if(data && data.length){
            return res.status(200).json({
                message: "lấy sp thành công",
                data,
            })
        }
        return res.status(204).json({
            message: "ko tìm thấy sản phẩm"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete({_id: req.params.id})
        if(!data){
            return res.status(204).json({
                message: "ko tìm thấy sp"
            })
        }
        return res.status(200).json({
            message: "xóa thành công",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export const addCategory = async (req, res) => {
    try {
        const { name, desc, slug } = req.body
        const newCategory = new Category({
            name: name,
            desc: desc,
            slug: slug,
        })
        const data = await newCategory.save()
        if(!data){
            return res.status(204).json({
                message: "ko tìm thấy danh mục sp"
            })
        }
        return res.status(200).json({
            message: "thêm danh mục sp thành công",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,

        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const response = await Category.findByIdAndUpdate(req.params.id, req.body)
        if(!response){
            return res.status(204).json({
                message: "ko tìm thấy sp"
            })
        }
        return res.status(200).json({
            message: "cập nhật danh mục thành công",
            response,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export const getOneCategoryBySlug = async (req, res) => {
    try {
        const data = await Category.findOne({slug: req.query.slug})
        if(!data){
            return res.status(204).json({
                message: "ko tìm thấy danh mục"
            })
        }
        return res.status(200).json({
            message: "lấy danh mục theo tên thành công",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export const getOneCategoryById = async (req, res) => {
    try {
        const data = await Category.find({_id: req.params.id})
        if(!data){
            return res.status(204).json({
                message: "ko tim thấy danh mục"
            })
        }
        return res.status(200).json({
            message: "lấy danh mục theo id thành công",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getOneCategoryByName = async (req, res) => {
    try {
        const data = await Category.findOne({name: req.params.name})
        if(!data){
            return res.status(204).json({
                message: "ko tìm thấy danh mục"
            })
        }
        return res.status(200).json({
            message: "lấy danh mục theo tên thành công",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}