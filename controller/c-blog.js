var Blog = require('../model/m-blog').Blog;
var data_content = require('../data/content');

exports.get = function (req, res) {
    Blog.showAllPosts(function (posts) {
        if (posts.length) {
            res.render('pages/blog/page-blog', {data: data_content, css: 'blog', posts: posts});
        } else {
            res.render('pages/blog/page-blog', {data: data_content, css: 'blog'});
        }
    });
};











