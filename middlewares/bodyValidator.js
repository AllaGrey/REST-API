const Joi = require('joi');
const { HttpError } = require('../helpers');
const { constants } = require('../helpers')


const validationSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
      'any.required': 'missing required name field',
    }).required(),
  email: Joi.string().min(3).max(30).pattern(new RegExp(constants.emailRegExp)).messages({
      'any.required': 'missing required email field',
    }).required(),
  phone: Joi.string().min(3).max(30).pattern(new RegExp(constants.phoneRegExp)).messages({
      'any.required': 'missing required phone field',
  }).required(),
  favorite: Joi.boolean().required(),
});

const bodyValidation = () => {
  const validationFunc = (req, res, next) => {
    const { body } = req;
    console.log('this is Joi');
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
    bodyValidation
}