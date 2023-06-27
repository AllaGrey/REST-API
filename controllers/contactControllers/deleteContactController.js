const { HttpError, ctrlWrap } = require('../../helpers');
const { Contact } = require('../../models');

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const contact = await Contact.findById(contactId);

    if (JSON.stringify(contact.owner) !== JSON.stringify(owner)) {
        throw HttpError(404, 'Not found');
    }
    
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
        throw HttpError(404, 'Not found')
    }

    res.status(200).json({message: "contact deleted"});    
}

module.exports = {
    deleteContact: ctrlWrap(deleteContact)
}
