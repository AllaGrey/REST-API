const Joi = require('joi');
const HttpError = require('../helpers/HttpError');

const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const validationSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
      'any.required': 'missing required name field',
    }).required(),
  email: Joi.string().min(3).max(30).pattern(new RegExp(emailRegExp)).messages({
      'any.required': 'missing required email field',
    }).required(),
  phone: Joi.string().min(3).max(30).pattern(new RegExp(phoneRegExp)).messages({
      'any.required': 'missing required phone field',
    }).required(),
});

const validation = () => {
  const validationFunc = (req, res, next) => {
    const { body } = req;

    if (Object.keys(body).length === 0) {
      next(HttpError(400, 'missing fields'));
    }

      const { error } = validationSchema.validate(body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  }
  return validationFunc
}

module.exports = {
    validation
}