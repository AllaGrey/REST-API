const { HttpError, ctrlWrap } = require('../../helpers');
const { Contact } = require('../../models');

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const result = await Contact.findById(contactId, '-__v');

    if (JSON.stringify(result.owner) !== JSON.stringify(owner)) {
        throw HttpError(404, 'Not found');
    }

    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);    
}

module.exports = {
    getContactById: ctrlWrap(getContactById)
}