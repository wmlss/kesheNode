// + 学号 int need studentId
// + 岗位id int need workId
// + 申请情况 bool
// + 本次评分  score number
'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applySchema = mongoose.Schema({
  studentId: {type: String, required:true, unqiue:true},
  workId: {type: String, required:true},
  bool: {type: Boolean, default: false},
  score: {type: Number, default: 0},
});

const Apply = mongoose.model('apply', applySchema);

module.exports = Apply;
