'use strict';
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var caplogsRoutes = require('./routes/captains-logs-routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/capslogsApp-development');

var app = express();
app.use(express.static(__dirname + '/build'));

var router = express.Router();

caplogsRoutes(router);

app.use('/api/v1', router);

http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
