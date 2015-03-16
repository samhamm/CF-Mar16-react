'use strict';

var mongoose = require('mongoose');

var celebSchema = new mongoose.Schema({
  handle: String
});

module.exports = mongoose.model('Celeb', celebSchema);
