// + 学号 int need
// + 岗位id int need
// + 实际工作描述 string 非必需 workDesc
// + 评分 double 一位小数 （0-100） 必需

'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessSchema = mongoose.Schema({
  studentId: {type: String, required:true, unqiue:true},
  workId: {type: String, required:true},
  bool: {type: Boolean, default: false},
  score: {type: Number, required:true}
});

const Assess = mongoose.model('assess', applySchema);

module.exports = Assess;
