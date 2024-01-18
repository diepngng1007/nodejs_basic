export const authorization = async (req, res, next) => {
    try {
        console.log('req.user.id', req.user.id);
        console.log('req.params.id', req.params.id);
        console.log('req.user.role', req.user.role);
        if (req.user.id === req.params.id || req.user.role === "admin") {
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