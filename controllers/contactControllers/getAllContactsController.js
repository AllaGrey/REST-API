const { Contact } = require('../../models');
const { ctrlWrap } = require('../../helpers');

const getAllContacts = async (req, res, next) => {

    const { _id: owner } = req.user;
    const { page = 1, limit = 2, favorite } = req.query;
    
    const skip = (page - 1) * limit;

    const options = { owner };
    if ( typeof favorite !== 'undefined') options.favorite = favorite;

    const result = await Contact.find(options, '-__v', {skip, limit});

    res.status(200).json(result);    
}

module.exports = {
    getAllContacts: ctrlWrap(getAllContacts)
}