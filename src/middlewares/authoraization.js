export const authorization = async (req, res, next) => {
    
    try {

        if (req.user.id === req.params.id_user && req.user.role === "admin") {
            return next()
        } else {
            return res.status(403).json({
                message: "Bạn không có quyền truy cập tài nguyên!"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}