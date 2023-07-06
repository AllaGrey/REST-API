const { Schema, model } = require('mongoose');
const { handleMongooseError, constants } = require('../helpers');
const Joi = require('joi');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: constants.emailRegExp,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: '',
    },
    avatarURL: {
        type: String,
        require: true,
    }
}, { versionKey: false });

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(new RegExp(constants.emailRegExp)).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter').valid('pro').valid('business'),
});

const userSchemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
}

const User = model('User', userSchema);

module.exports = {
    User,
    userSchemas,
}