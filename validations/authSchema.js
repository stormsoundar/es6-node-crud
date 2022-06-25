import Joi from 'joi';

const authValidation = {};

authValidation.registrationSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  phone: Joi.string().required().min(7).max(10),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});

authValidation.loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

export default authValidation;
