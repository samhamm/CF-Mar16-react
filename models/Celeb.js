'use strict';

var mongoose = require('mongoose');

var celebSchema = new mongoose.Schema({
  handle: String,
  diedOn: Number
});

module.exports = mongoose.model('Celeb', celebSchema);
