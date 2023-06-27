const { User } = require('../../models');
const { ctrlWrap, HttpError } = require('../../helpers');
const bcrypt = require('bcrypt');

const register = async(req, res, next) => {
    const { body } = req;
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({...body, password: hashPassword});

    if (!newUser) {
        throw HttpError()
    }

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    });
}

module.exports =  ctrlWrap(register);