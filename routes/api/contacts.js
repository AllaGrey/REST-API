const express = require('express');
const { getAllContacts, getContactById, createContact, updateContact, deleteContact } = require('../../controllers/contactsControllers');
const {validation} =require('../../middlewares/validator')

const router = express.Router();

router.get('/', getAllContacts)

router.get('/:contactId', getContactById)

router.post('/', validation(), createContact)

router.put('/:contactId', validation(), updateContact)

router.delete('/:contactId', deleteContact)

module.exports = router
