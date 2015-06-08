var User = require('../model/m-user').User;
var Setti = require('../model/m-settings').Setti;
var async = require('async');
var data_content = require('../data/content');

exports.get = function (req, res) {
    var username = req.session.user;

    async.parallel({
        last_info: function (callback) {
            User.lastInfos(username, function (cb) {
                callback(null, cb);
            });
        },
        showallUsers: function (callback) {
            User.showAllUsers(function (users_data) {
                callback(null, users_data);
            });
        },
        reg_settings: function (callback) {
            Setti.regEnableCheck(function (sett) {
                callback(null, sett);
            });
        }
    }, function (err, results) {
        if (err) {
            //err
        }
        res.render('pages/services/page-services', {
            user: req.session.user,
            data: data_content,
            css: 'services',
            users_data: results
        });
    });
};


// REgistration enable or disable
exports.post = function (req, res, next) {
    var qRes = res,
        head_host = req.headers.host,
        huj_a = req.body.huj,
        cur_user = req.session.user;

    if (((head_host == 'localhost:3000') || (head_host = 'shemesh.info')) && (huj_a == 'givi')) {
        Setti.regEnableChange(cur_user);
    }
};
