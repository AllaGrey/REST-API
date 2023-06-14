const express = require('express');
const { getAllContacts, getContactById, createContact, updateContact, deleteContact, changeStatusFavorite } = require('../../controllers/contactsControllers');
const { bodyValidation, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', getAllContacts)

router.get('/:contactId', isValidId, getContactById)

router.post('/', bodyValidation(), createContact)

router.put('/:contactId',isValidId, bodyValidation(), updateContact)

router.delete('/:contactId', isValidId, deleteContact)

router.patch('/:contactId/favorite', isValidId, bodyValidation(), changeStatusFavorite)

module.exports = router
