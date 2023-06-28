const path = require('path');
const fs = require('fs/promises');
const { ctrlWrap } = require('../../helpers');
const { User } = require('../../models');
const Jimp = require("jimp");

const pathDirAvatar = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const file = await Jimp.read(tempUpload);
    await file.resize(250, 250).writeAsync(tempUpload);
    
    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join(pathDirAvatar, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', filename);
    
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(201).json({
        avatarURL,
    })
}

module.exports = ctrlWrap(updateAvatar);