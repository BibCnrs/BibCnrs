'use strict';
require('babel-register');
var config = require('config');

var app = require('./server').default;

app.listen(config.port);
