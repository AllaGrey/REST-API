const { HttpError, ctrlWrap } = require('../../helpers');
const { Contact } = require('../../models');

const createContact = async (req, res, next) => {
    const { body } = req;
    const { _id: owner } = req.user;

    const result = await Contact.create({...body, owner});

    if (!result) {
        throw HttpError()
    }
    res.status(201).json(result)

}

module.exports = {
    createContact: ctrlWrap(createContact)
}