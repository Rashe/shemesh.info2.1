var User = require('../model/m-user').User;
var Setti = require('../model/m-settings').Setti;
var Encript = require('./c-crypto').Encript;
var Valida = require('./c-validator').Valida;
var errors = require('../data/errors');

exports.post = function (req, res) {
    Setti.regEnableCheck(function (callback) {
        if (callback.registration == false) {
            res.writeHead(403, {"Content-Type": "text/plain"});
            res.end(errors.disabled_reg);
            return;
        }
        else {
            if ((Valida(req.body.username, 'str_num') == false) || (Valida(req.body.email, 'email') == false)) {
                res.writeHead(403, {"Content-Type": "text/plain"});
                res.end(errors.fuck_you);
                return;
            }

            var qRes = res,
                data = {};
            data.user = req.body.username;
            data.email = req.body.email;
            data.pass = req.body.password;
            data.hashedPass = Encript(data.user, data.pass);
            data.ghh = req.body.ghhh;

            if (data.user && data.pass && data.ghh == '' && data.email) {
                User.register(data, function (call) {
                    if (call) {
                        req.session.user = data.user;
                        qRes.send({});
                    } else {
                        res.writeHead(403, {"Content-Type": "text/plain"});
                        res.end(errors.user_exist);
                    }
                });
            }
            else {
                res.writeHead(403, {"Content-Type": "text/plain"});
                res.end(errors.fuck_you);
            }
        }
    });
};
