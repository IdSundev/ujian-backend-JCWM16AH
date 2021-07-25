const bcrypt = require('bcryptjs');
const encryptConfig = require('../config/encrypt');

exports.Encrypt = (password) => {
    return bcrypt.hashSync(password, encryptConfig.salt);
};