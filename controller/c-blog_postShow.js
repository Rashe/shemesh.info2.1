var Blog = require('../model/m-blog').Blog;
var url = require('url');
var errors = require('../data/errors');
var data_content = require('../data/content');
var Valida = require('./c-validator').Valida;


exports.get = function (req, res) {
    var url_parts = url.parse(req.url, true).pathname.split("/"),
        post_url = url_parts[3],
        vali_pu = Valida(post_url, 'url');

    if (vali_pu == false) {
        res.writeHead(403, {"Content-Type": "text/plain"});
        res.end(errors.fuck_you);
    }

    Blog.showPost(post_url, function (callback) {
        if (callback) {
            res.render('pages/blog/page-blog_article', {data: data_content, css: 'blog', post_data: callback});
        } else {
            res.render('pages/page-error', {data: data_content});
        }
    });
};






