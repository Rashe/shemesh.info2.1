var mongoose = require('./mongoose');

var schema = mongoose.Schema({
    post_user: {
        type: String
    },
    post_title: {
        type: String
    },
    post_link: {
        type: String
    },
    post_body: {
        type: String
    },
    post_teaser: {
        type: String
    },
    post_published: {
        type: Boolean
    },
    post_dateCreate: {
        type: Date,
        default: Date.now
    }
});

schema.statics.showAllPosts = function (callback) {
    var Blog = this;
    Blog.find({post_published: true}).sort({post_dateCreate: 'desc'}).exec(function (err, posts) {
        if (err) {
            //error handler
        }
        callback(posts);
    });
};

schema.statics.showAllPostsAdmin = function (callback) {
    var Blog = this;
    Blog.find({}, function (err, posts) {
        if (err) {
            //error
        }

        if (posts.length) {
            callback(posts);
        } else {
            var def_data = {
                def_data: "No posts"
            };
            callback(def_data);
        }
    });
};

schema.statics.countPostsAdmin = function (callback) {
    var Blog = this;
    Blog.count({}, function (err, posts) {
        if (err) {
            //error
        }
        if (posts) {
            callback(posts);
        } else {
            var def_data_count = {
                def_data_count: "0"
            };
            callback(def_data_count);
        }
    });
};

schema.statics.create_post = function (post_data, callback) {
    var Blog = this, publish;

    if (post_data.post_publish) {
        publish = true;
    } else {
        publish = false;
    }
    var create_post = new Blog({
        post_user: post_data.user,
        post_title: post_data.title,
        post_link: post_data.post_link,
        post_body: post_data.post_body,
        post_teaser: post_data.post_teaser,
        post_published: publish
    });

    create_post.save(function (err) {
        if (err) throw  err;
    });
    callback();
};

schema.statics.showPost = function (post_link, callback) {
    var Blog = this;
    Blog.findOne({post_link: post_link}, function (err, post) {
        if (err) {
            //err
        }
        if (post) {
            callback(post);
        } else {
            callback(false);
        }
    });
};

schema.statics.showPostEdit = function (post_link, callback) {
    var Blog = this;
    Blog.findOne({post_link: post_link}, function (err, post) {
        if (err) {
            //err
        }
        if (post) {
            callback(post);
        }
        else {
            callback(false);
        }
    });
};

schema.statics.postEdit = function (blog_data, callback) {
    var Blog = this, publish;
    Blog.findOne({_id: blog_data.post_id}, function (err, post) {
        if (err) {
            //error
        }
        if (post) {
            post.post_user = blog_data.user;
            post.post_title = blog_data.title;
            post.post_link = blog_data.post_link;
            post.post_body = blog_data.post_body;
            post.post_teaser = blog_data.post_teaser;

            if (blog_data.post_publish) {
                publish = true;
            }
            else {
                publish = false;
            }
            post.post_published = publish;
            post.save();
            callback(true);
        }
        else {
            callback(false);
        }
    });
};


exports.Blog = mongoose.model('Blog', schema);