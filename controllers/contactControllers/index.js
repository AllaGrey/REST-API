const { getAllContacts } = require('./getAllContactsController');
const { getContactById } = require('./getContactByIdController');
const { createContact } = require('./createContactController');
const { deleteContact } = require('./deleteContactController');
const { changeStatusFavorite } = require('./changeStatusFavoriteController');
const { updateContact } = require('./updateContactController');


module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    changeStatusFavorite,
    updateContact,
}