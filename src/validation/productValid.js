import Joi from "joi";

export const productValid = Joi.object({
  name: Joi.string().required().min(6).max(255),
  price: Joi.number().required().min(0),
  desc: Joi.string().required().min(6),
  quantity: Joi.number().required(),
  thumbnail: Joi.string().required().min(6).max(255),
  id_type: Joi.string().required().min(6).max(255),
  size:Joi.array()
})