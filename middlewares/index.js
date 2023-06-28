const { bodyValidation } = require('./bodyValidator');
const { isValidId } = require('./idValidator');
const authentication = require('./authenticate')
const { upload } = require('./upload');

module.exports = {
    bodyValidation,
    isValidId,
    authentication,
    upload,
}