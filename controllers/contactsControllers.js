const { HttpError, ctrlWrap } = require('../helpers');
const { Contact } = require('../models');

const getAllContacts = async (req, res, next) => {
    const result = await Contact.find({}, '-__v');
    res.status(200).json(result);    
}

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId, '-__v');

    if (!result) {
        throw HttpError(404, 'Not found')
    }
    res.status(200).json(result);    
}

const createContact = async (req, res, next) => {
    const { body } = req;
    const result = await Contact.create(body);

    if (!result) {
        throw HttpError()
    }
    res.status(201).json(result)

}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { body } = req;
    const result = await Contact.findByIdAndUpdate(contactId, body, {returnOriginal: false});

    if (!result) {
        throw HttpError(404, 'Not found')
    }

    res.status(201).json(result);    
}

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
        throw HttpError(404, 'Not found')
    }

    res.status(200).json({message: "contact deleted"});    
}

const changeStatusFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const { body } = req;
    const result = await Contact.findByIdAndUpdate(contactId, body, {returnOriginal: false});

    if (!result) {
        throw HttpError(404, 'Not found')
    }

    res.status(201).json(result);       
}

const contactsControllers = {
    getAllContacts: ctrlWrap(getAllContacts),
    getContactById: ctrlWrap(getContactById),
    createContact: ctrlWrap(createContact),
    updateContact: ctrlWrap(updateContact),
    deleteContact: ctrlWrap(deleteContact),
    changeStatusFavorite: ctrlWrap(changeStatusFavorite)
}

module.exports = contactsControllers;