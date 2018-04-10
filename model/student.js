// + 学号 int need 唯一 studentId
// + 姓名 string need
// + 个人描述 string 非必需 desc
// + 以往申请：后台自动记录{工作id， 评分} score
'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
  studentId: {type: String, required:true, unqiue:true},
  psd: {type: String, required:true},
  studentName: {type: String, required:true},
  cardID: {type: String, required:true},
  desc: {type: String},
  score: {type: Number, required:true},
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
