const  logout = require('./logoutController');
const  register  = require('./registerController');
const  login  = require('./loginController');
const getCurrentData = require('./getCurrentDataController');
const subscriptionUpdate = require('./subscriptionController')


module.exports = {
    register,
    login,
    logout,
    getCurrentData,
    subscriptionUpdate,
}