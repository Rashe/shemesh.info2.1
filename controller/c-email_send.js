var nodemailer = require("nodemailer");
var config = require('../config/config');

exports.post = function (req, res) {

    var email = req.body.email,
        text = req.body.text,
        subject = 'From shemesh.info about',
        reciever = config.email_reciever;

    //TODO
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: config.email_auth_user,
            pass: config.email_auth_pass
        }
    });

    var mailOptions = {
        from: email, // sender address
        to: reciever, // list of receivers
        subject: subject, // Subject line
        text: text
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {

        } else {

        }
    });


};