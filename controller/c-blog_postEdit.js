var Blog = require('../model/m-blog').Blog;
var url = require('url');
var data_content = require('../data/content');

exports.get = function (req, res) {
    var url_parts = url.parse(req.url, true).pathname.split("/");
    var post_url = url_parts[3];
    Blog.showPostEdit(post_url, function (callback) {
        if (callback) {
            res.render('pages/services/page-blog_edit_post', {
                user: req.session.user,
                data: data_content,
                css: 'blog',
                post_data: callback
            });
        } else {
            res.render('pages/page-error', {data: data_content});
        }
    });
};


exports.post = function (req, res) {
    var qRes = res,
        data = {},
        post_teaser = req.body.post_body.split("<hr />");

    data.user = req.session.user;
    data.title = req.body.title;
    data.post_link = req.body.post_link;
    data.post_body = req.body.post_body;
    data.post_teaser = post_teaser[0];
    data.post_publish = req.body.publish;
    data.post_id = req.body.post_id;

    if (data.post_link == '') {
        var arr = data.title.toLowerCase().split(" ");
        data.post_link = arr.join('_');
    }

    Blog.postEdit(data, function (call) {
        qRes.send({});
    });
};


