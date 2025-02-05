const express = require('express');
const { bodyValidation, upload } = require('../../middlewares');
const { userSchemas } = require('../../models');
const { register, login, logout, getCurrentData, subscriptionUpdate, updateAvatar, verificationEmail, resendVerificationEmail } = require('../../controllers/userControllers');
const { authentication } = require('../../middlewares');

const router = express.Router();

router.post('/register', bodyValidation(userSchemas.registerSchema), register);

router.get('/verify/:verificationToken', verificationEmail);

router.post('/verify', bodyValidation(userSchemas.verificationEmailSchema), resendVerificationEmail);

router.post('/login', bodyValidation(userSchemas.registerSchema), login);

router.get('/current', authentication, getCurrentData);

router.post('/logout', authentication, logout);

router.patch('/current/subscription', authentication, bodyValidation(userSchemas.subscriptionSchema), subscriptionUpdate);

router.patch('/avatars', authentication, upload.single('avatar'), updateAvatar);

module.exports = router;
