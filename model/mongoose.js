var mongoose = require('mongoose');
var config = require('../config/config');

var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://' + config.mongo_user + ':' + config.mongo_pass + '@ds035290.mongolab.com:35290/shemesh';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);


mongoose.connect(mongooseUri);
//mongoose.connect('mongodb://localhost/shemesh_js7');
module.exports = mongoose;