const { HttpError, ctrlWrap } = require('../../helpers');
const { Contact } = require('../../models');

const changeStatusFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { _id: owner } = req.user;

    const contact = await Contact.findById(contactId);


        if (!contact) {
        throw HttpError(404, 'Not found')
    }

    if (JSON.stringify(contact.owner) !== JSON.stringify(owner)) {
        throw HttpError(404, 'Not found');
    }
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, { returnOriginal: false });

    res.status(201).json(result);        
}

module.exports = {
    changeStatusFavorite: ctrlWrap(changeStatusFavorite)
}