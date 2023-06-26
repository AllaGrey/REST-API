const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const { constants } = require('../helpers')
const Joi = require('joi');

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
        match: constants.emailRegExp,
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
        match: constants.phoneRegExp
    },
    favorite: {
        type: Boolean,
        default: false,
        required: [true, 'Set favorite status for contact'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, {versionKey: false })

contactSchema.post('save', handleMongooseError);

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

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    validationSchema,
}
