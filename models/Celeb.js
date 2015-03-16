'use strict';

var mongoose = require('mongoose');

var celebSchema = new mongoose.Schema({
  handle: String,
  category: String,
  deathDate: String
});

module.exports = mongoose.model('Celeb', celebSchema);
