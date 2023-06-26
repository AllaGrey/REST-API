const { User } = require('../../models');
const { ctrlWrap, HttpError } = require('../../helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET_KEY } = process.env;

const login = async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, 'Email or password is wrong');
    }

    const comparedPassword = bcrypt.compare(password, user.password);
    if (!comparedPassword) {
        throw HttpError(401, 'Email or password is wrong');
    }


    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,    
        user: {
            email: user.email,
            subscription: user.subscription,
        }   
    })
}

module.exports =  ctrlWrap(login);