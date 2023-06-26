const express = require('express');
const { getAllContacts, getContactById, createContact, updateContact, deleteContact, changeStatusFavorite } = require('../../controllers/contactControllers');
const { bodyValidation, isValidId, authentication } = require('../../middlewares');
const {validationSchema} = require('../../models')

const router = express.Router();

router.get('/', authentication, getAllContacts)

router.get('/:contactId', authentication, isValidId, getContactById)

router.post('/', bodyValidation(validationSchema), authentication, createContact)

router.put('/:contactId',isValidId, bodyValidation(validationSchema), authentication, updateContact)

router.delete('/:contactId', isValidId, authentication, deleteContact)

router.patch('/:contactId/favorite', isValidId, bodyValidation(validationSchema), authentication, changeStatusFavorite)

module.exports = router
