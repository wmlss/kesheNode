'use strict'
const test = require('../controller/test2.js');
const Router = require('koa-router');
const work = require('../controller/work.js')
const company = require('../controller/company.js');
const student = require('../controller/student.js');
const apply = require('../controller/apply.js');
const root = require('../controller/root.js');
// get 请求资源
// post 新建资源
// put 更新资源
// dettle 删除

module.exports = function() {
  var router = new Router({
    prefix: '/api',
  });

  router
  .post('/root/login', root.login)
  .post('/student/login', student.login)

  .get('/work/get', root.isLogin, work.get)
  .get('/work/search/:val', root.isLogin, work.search)
  .get('/work/find/:id', root.isLogin, work.find)
  .post('/work/add', root.isLogin, work.add)
  .put('/work/update/:id', root.isLogin, work.update)
  .delete('/work/delete/:id', root.isLogin, work.delete)

  .get('/company/get', root.isLogin, company.get)
  .get('/company/search/:val', root.isLogin, company.search)
  .get('/company/find/:id', root.isLogin, company.find)
  .post('/company/add', root.isLogin, company.add)
  .put('/company/update/:id', root.isLogin, company.update)
  .delete('/company/delete/:id', root.isLogin, company.delete)

  .post('/student/login', root.isLogin, student.login)
  .get('/student/get', root.isLogin, student.get)
  .get('/student/search/:val', root.isLogin, student.search)
  .get('/student/find/:id', root.isLogin, student.find)
  .post('/student/add', root.isLogin, student.add)
  .put('/student/update/:id', root.isLogin, student.update)
  .delete('/student/delete/:id', root.isLogin, student.delete)

  .get('/apply/get', root.isLogin, apply.get)
  .get('/apply/getAll', root.isLogin, apply.getAll)
  // .get('/apply/search/:val', student.search)
  // .get('/apply/find/:id', student.find)
  .post('/apply/add', root.isLogin, apply.add)
  .put('/apply/update/', root.isLogin, apply.update)
  .put('/apply/adjust/', root.isLogin, apply.adjust)
  .put('/apply/assess/', root.isLogin, apply.assess)
  .delete('/apply/delete/', apply.delete)

  .get('/test', test.test)

  return router;
}
