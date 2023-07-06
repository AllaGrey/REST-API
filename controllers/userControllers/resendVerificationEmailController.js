const { User } = require("../../models");
const { ctrlWrap, HttpError, sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const resendVerificationEmail = async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) throw HttpError(404, 'Not found');

    if (user.verify === true) throw HttpError(400, 'Verification has already been passed');

        const verificationEmail = {
        to: email,
        from: 'alla.grey@meta.ua',
        subject: 'Verification email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify your email</a>`
    };

    await sendEmail(verificationEmail);

    res.status(200).json({
        message: 'Verification email sent',
    });

}

module.exports = ctrlWrap(resendVerificationEmail);