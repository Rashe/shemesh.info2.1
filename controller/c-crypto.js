var crypto = require('crypto');
var config = require('../config/config');

function Encript(username, password) {
    return crypto.createHmac(config.crypto, username).update(password).digest('hex');
}

exports.Encript = Encript;