var Blog = require('../model/m-blog').Blog;

exports.post = function (req, res) {

    var qRes = res,
        data = {};
    data.user = req.session.user;
    data.title = req.body.title;
    data.post_link = req.body.post_link;
    data.post_body = req.body.post_body;
    var post_teaser = req.body.post_body.split("<hr />");
    data.post_teaser = post_teaser[0];
    data.post_publish = req.body.publish;

    if (data.post_link == '') {
        var arr = data.title.toLowerCase().split(" ");
        data.post_link = arr.join('_');
    }

    Blog.create_post(data, function (call) {
        qRes.send({});
    });
};


