const { HttpError } = require('../../helpers');

// const { User } = require('../../models');

const getCurrentData = async(req, res, next) => {
    const { email, subscription } = req.user;
    
    if (!req.user) {
        throw HttpError(401, "Not authorized");
    }
res.status(200).json({ email, subscription });
}

module.exports = getCurrentData;