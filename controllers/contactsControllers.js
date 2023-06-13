const contacts = require('../models/contacts');
const HttpError = require('../helpers/HttpError');
const ctrlWrap = require('../helpers/ctrlWrapper');

const getAllContacts = async (req, res, next) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);    
}

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
        throw HttpError(404, 'Not found')
    }
    res.status(200).json(result);    
}

const createContact = async (req, res, next) => {
    const { body } = req;
    const result = await contacts.addContact(body);

    if (!result) {
        throw HttpError()
    }
    res.status(201).json(result)

}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { body } = req;
    const result = await contacts.updateContact(contactId, body);

    if (!result) {
        throw HttpError(404, 'Not found')
    }

    res.status(201).json(result);    
}

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
        throw HttpError(404, 'Not found')
    }

    res.status(200).json({message: "contact deleted"});    
}

module.exports = {
    getAllContacts: ctrlWrap(getAllContacts),
    getContactById: ctrlWrap(getContactById),
    createContact: ctrlWrap(createContact),
    updateContact: ctrlWrap(updateContact),
    deleteContact: ctrlWrap(deleteContact)
}