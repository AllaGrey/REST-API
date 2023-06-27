const { HttpError } = require('../../helpers');

const { User } = require('../../models');

const subscriptionUpdate = async(req, res, next) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    console.log(_id);
    console.log(subscription);
    
    if (!req.user) {
        throw HttpError(401, "Not authorized");
    }

    const result = await User.findByIdAndUpdate(_id, { subscription }, { returnOriginal: false })
    console.log(result);

res.status(200).json( result );
}

module.exports = subscriptionUpdate;