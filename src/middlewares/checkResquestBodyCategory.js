import { categoryValid } from "../validation/categoryValid";

export const checkRequestBodyCategory = async (req, res, next) => {
    try {
        const body = req.body
        const { error } = productValid.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(204).json({
                message: errors,
            });
        }
        next()
    } catch (error) {
        return res.status(400).json({
            name: error.name,
            message: error.message,
          });
    }
}