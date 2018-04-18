// + 公司名称 string need companyName
// + 负责人名称 string need principal
// + 电话 number need phone
// + 公司地点 string need companyPlace

'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = mongoose.Schema({
  companyName: {type: String, required:true},
  principal: {type: String, required:true},
  phone: {type: Number, required:true},
  companyPlace: {type: String, required:true},
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
