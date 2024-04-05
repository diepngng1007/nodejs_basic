import Joi from "joi";

export const signUpValid = Joi.object({
  username: Joi.string().required().min(6).max(255),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
  role: Joi.string().min(5).max(10)
});

export const signInValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
});