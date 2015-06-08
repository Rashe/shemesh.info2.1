var User = require('../model/m-user').User;
var Encript = require('./c-crypto').Encript;
var Valida = require('./c-validator').Valida;
var errors = require('../data/errors');

exports.post = function (req, res, next) {

    if (Valida(req.body.username, 'str_num') == false) {
        res.writeHead(403, {"Content-Type": "text/plain"});
        res.end(errors.fuck_you);
    }
    var qRes = res,
        data = {};
    data.user = req.body.username;
    data.pass = req.body.password;
    data.hashedPass = Encript(data.user, data.pass);

    if (data.user && data.pass) {
        User.authorize(data, function (user_c) {
            if (user_c == 1) {
                res.writeHead(403, {"Content-Type": "text/plain"});
                res.end(errors.no_suchUser);

            } else if (user_c == 2) {
                res.writeHead(403, {"Content-Type": "text/plain"});
                res.end(errors.wrong_pass);
            } else {
                req.session.user = data.user;
                qRes.send({});
            }
        });

    } else {
        res.writeHead(403, {"Content-Type": "text/plain"});
        res.end(errors.fuck_you);
    }
};