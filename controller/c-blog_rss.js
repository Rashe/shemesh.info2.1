var Blog = require('../model/m-blog').Blog;
var fs = require('fs');
var errors = require('../data/errors');

exports.post = function (req, res) {

    Blog.showAllPosts(function (posts) {

        var output = '';
        var site_url = 'https://shemesh.info';
        var temp_start = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel>';
        var temp_end = '</channel></rss>';
        var main_title = '<title>Shemesh.info RSS feed</title>';
        var main_description = '<description>Shemesh.info</description>';
        var main_link = '<link>' + site_url + '</link>';
        var item_el_start = '<item>';
        var item_el_end = '</item>';

        output += temp_start + main_title + main_description + main_link;

        for (var i = 0; i < posts.length; i++) {
            output += item_el_start;
            output += '<title>' + posts[i].post_title + '</title>';
            output += '<link>' + site_url + '/blog/post/' + posts[i].post_link + '</link>';
            output += '<description>' + posts[i].post_teaser + '</description>';
            output += item_el_end;
        }

        output += temp_end;

        fs.writeFile('./public/rss.xml', output, function (err) {
            if (err) {
                res.writeHead(403, {"Content-Type": "text/plain"});
                res.end(errors.fuck_you);
                return;
            } else {
                res.send({});
            }
        });

    });
};











