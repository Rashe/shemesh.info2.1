var Blog = require('../model/m-blog').Blog;
var async = require('async');
var data_content = require('../data/content');

exports.get = function (req, res) {
    async.parallel({
        all_posts: function (callback) {
            Blog.showAllPostsAdmin(function (posts) {
                callback(null, posts);
            });
        },
        count_posts: function (callback) {
            Blog.countPostsAdmin(function (count) {
                callback(null, count);
            });
        }
    }, function (err, results) {
        if (err) {
            //errors must be handle
        }
        res.render('pages/services/page-blog_admin', {
            user: req.session.user,
            data: data_content,
            css: 'blog_admin',
            blog_admin: results
        });
    });
};











