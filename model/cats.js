'use strict'
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/test');
var catSchema = mongoose.Schema({
  name: String
});

catSchema.methods.speak = function() {
  var name = this.name ? this.name : 'no name';
}

var Cats = mongoose.model('cat', catSchema);

module.exports = Cats;
