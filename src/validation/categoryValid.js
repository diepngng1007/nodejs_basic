import Joi from "joi";

export const categoryValid = Joi.object({
  name: Joi.string().required().min(3).max(255),
  desc: Joi.string().min(6).max(255)
});