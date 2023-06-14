const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const { constants } = require('../helpers')

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
})

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = Contact;