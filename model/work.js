'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var workSchema = mongoose.Schema({
  // id: {type: String, index: true}, mongodb 自己有主键_id
  workName: {type: String, required:true},
  companyName: {type: String, required:true},
  principal: {type: String, required:true},
  phone: {type: Number, required:true},
  wage: {type: Number, required:true},
  workPlace: {type: String, required:true},
  startTime: {type: Date, dafault: Date.now()},
  endTime: {type: Date},
  workStartTime: {type: Date, dafault: Date.now()},
  workEndTime: {type: Date},
  workDesc: String,
  bool: {type: Boolean, default: false},
});

var Work = mongoose.model('Work', workSchema);

module.exports = Work;
