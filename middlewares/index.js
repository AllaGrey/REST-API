const { bodyValidation } = require('./bodyValidator');
const { isValidId } = require('./idValidator');
const authentication = require('./authenticate')

module.exports = {
    bodyValidation,
    isValidId,
    authentication,
}