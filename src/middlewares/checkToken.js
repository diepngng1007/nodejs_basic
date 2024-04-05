import jwt from 'jsonwebtoken'
import BlackList from '../models/BlackList'

export const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]
        const isTokenBlackList = await BlackList.findOne({ token })
        if(isTokenBlackList){
            return res.status(401).json({
                message: "Token ko hop le, vui long thu lai"
            })
        }
        jwt.verify(token, process.env.SECRET_CODE, (err, user) => {
            if(err){
                return res.status(401).json({
                    message: "token ko hop le, vui long thu lai"
                })
            }
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Xác minh token thất bại',
            detail: error.message,
          });
    }
}