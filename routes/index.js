var express = require('express');
var data_content = require('../data/content');
var router = express.Router();

/* GET */
router.get('/', function (req, res) {
    res.render('pages/page-index', {data: data_content, css: 'home'});
});

router.get('/about', function (req, res) {
    res.render('pages/page-about', {data: data_content, css: 'about'});
});

router.get('/user_normal', function (req, res) {
    res.render('pages/page-user_normal', {data: data_content, css: 'user_normal'});
});

router.get('/forgot_pass', function (req, res) {
    res.render('pages/page-forgot_pass', {data: data_content, css: 'forgot_pass'});
});

router.get('/login', function (req, res) {
    if (!req.session.user) {
        res.render('pages/page-login', {data: data_content, css: 'login'});
    }
    else {
        res.redirect('/services')
    }
});

router.get('/registration', function (req, res) {
    if (!req.session.user) {
        res.render('pages/page-registration', {data: data_content, css: 'registration'});
    }
    else {
        res.redirect('/services')
    }
});

router.get('/services', function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    else {
        require('../controller/c-services').get(req, res);
        //res.render('services', {data: data_content, css: 'services'});
    }
});

router.get('/logout', function (req, res) {
    delete req.session.user;
    res.redirect('/');
});

router.get('/blog', function (req, res) {
    require('../controller/c-blog').get(req, res);
});

router.get('/blog_article', function (req, res) {
    res.render('pages/blog/page-blog_article', {data: data_content, css: 'blog'});
});

router.get('/blog_admin', function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    else {
        require('../controller/c-blog_admin').get(req, res);
        //res.render('blog', {data: data_content, css: 'blog'});
    }
});

router.get('/blog_make_post', function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    else {
        //require('../controller/blog_make_post').get(req, res);
        res.render('pages/services/page-blog_make_post', {data: data_content, css: 'blog_make_post'});
    }
});

router.get('/blog/post/*', function (req, res) {
    require('../controller/c-blog_postShow').get(req, res);
});

router.get('/blog/post_edit/*', function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        require('../controller/c-blog_postEdit').get(req, res);
    }
});

router.get('/user_info', function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        require('../controller/c-user_info').get(req, res);
    }
});

//POST

router.post('/registration', function (req, res) {
    require('../controller/c-registration').post(req, res);
});

router.post('/reg_onOff', function (req, res) {
    require('../controller/c-services').post(req, res);
});

router.post('/login', function (req, res) {
    require('../controller/c-login').post(req, res);
});

router.post('/blog_make', function (req, res) {
    require('../controller/c-blog_make').post(req, res);
});

router.post('/post_edit', function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        require('../controller/c-blog_postEdit').post(req, res);
    }
});

router.post('/send_me_mail', function (req, res) {
    require('../controller/c-email_send').post(req, res);
    res.send({});
});

router.post('/user_info', function (req, res) {
    require('../controller/c-user_info').post(req, res);
});

router.post('/create_rss', function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        require('../controller/c-blog_rss').post(req, res);
    }
});


module.exports = router;
