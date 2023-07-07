const { User } = require('../../models');
const { ctrlWrap, HttpError, sendEmail } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { BASE_URL } = process.env;

const register = async(req, res, next) => {
    const { body } = req;
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use');
    }

    const verificationToken = nanoid();

    const avatarURL = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);

    
    const verificationEmail = {
        to: email,
        from: 'alla.grey@meta.ua',
        subject: 'Verification email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify your email</a>`
    };

    const newUser = await User.create({...body, password: hashPassword, avatarURL, verificationToken});

    if (!newUser) {
        throw HttpError()
    }

    await sendEmail(verificationEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    });
}

module.exports =  ctrlWrap(register);