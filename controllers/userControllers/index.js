const  logout = require('./logoutController');
const  register  = require('./registerController');
const  login  = require('./loginController');
const getCurrentData = require('./getCurrentDataController');
const subscriptionUpdate = require('./subscriptionController');
const updateAvatar = require('./updateAvatarController');


module.exports = {
    register,
    login,
    logout,
    getCurrentData,
    subscriptionUpdate,
    updateAvatar,
}