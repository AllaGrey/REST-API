const { Contact, validationSchema } = require('./contactModel');
const { User, userSchemas } = require('./userModel');


module.exports = {
    Contact,
    validationSchema,
    User,
    userSchemas,
}