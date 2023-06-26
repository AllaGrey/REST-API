const { Contact } = require('../../models');
const { ctrlWrap } = require('../../helpers');

const getAllContacts = async (req, res, next) => {

    const { _id: owner } = req.user;
    const { page=1, limit=2, favorite=true } = req.query;
    const skip = (page-1)*limit
    const result = await Contact.find({owner, favorite}, '-__v', {skip, limit});

    res.status(200).json(result);    
}

module.exports = {
    getAllContacts: ctrlWrap(getAllContacts)
}