import { productValid } from "../validation/productValid";

export const checkRequestBodyProduct = async (req, res) => {
    try {
        const data = req.body;
        const { error } = productValid.validate(data,{
          abortEarly: false,
        });
        if(error){
            const errors = error.details.map((err) => err.message);
            return res.status(204).json({
              message: errors.join(",")
            })
        }
        next()  
    } catch (error) {
        return res.status(204).json({
            name: error.name,
            message: error.message,
          });
    }
}