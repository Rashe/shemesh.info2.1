var User = require('../model/m-user').User;
var data_content = require('../data/content');

exports.get = function (req, res) {
    var username = req.session.user;

    User.showUserInfo(username, function (callback) {
        if (callback) {
            res.render('pages/services/page-user_info', {
                user: req.session.user,
                data: data_content,
                css: 'user_info',
                data_db: callback
            });
        } else {
            res.render('pages/page-error', {data: data_content});
        }
    });
};


exports.post = function (req, res) {
    var qRes = res,
        data = {};

    data.user = req.session.user;
    data.first_name = req.body.first_name;
    data.second_name = req.body.second_name;

    User.userUpdateInfo(data, function (call) {
        qRes.send({});
    });
};


