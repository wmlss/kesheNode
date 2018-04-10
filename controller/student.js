const dbHelper = require('../helper/dbHelper.js');
const tool = require('./tool.js');
const student = require('../model/student.js');

module.exports = {
  login: async (ctx, next)=> {
      var students =  await dbHelper.get(ctx, next, student);
      var id = ctx.request.body.id;
      var psd = ctx.request.body.psd;

      if (id == 'root' && psd == 'root') {
        tool.response(ctx, 200, {
          msg: '登录成功'
        });
        return ;
      }

      for (var i=0; i<students.length; i++) {
        if (id == students[i].studentId && psd == students[i].psd) {
          ctx.cookies.set('studentId', students[i].studentId);
          tool.response(ctx, 200, {
            msg: '登录成功',
            id: students[i].studentId
          });
          return ;
        }
      }

      tool.response(ctx, 401, {
        msg: '登录信息错误'
      });
      return ;
  },

  isLogin: async (ctx, next)=> {
      var students =  await dbHelper.get(ctx, next, student);
      var id = ctx.header.authorization;

      //id存在且匹配对应则已登录
      if (!!id) {
        for (var i=0; i<students.length; i++) {
          if (id == students[i].id) {
            await next();
            return ;
          }
        }
      }
      tool.response(ctx, 401, {
        msg: '未登录'
      })
      return ;
  },

  get: async (ctx, next)=> {
    var res =  await dbHelper.get(ctx, next, student);
    ctx.body = res;
  },

  search: async (ctx, next)=> {
    var val = ctx.params.val;
    var res = await dbHelper.search(ctx, next, student, 'studentName', val);
    ctx.body = res;
  },

  find: async (ctx, next)=> {
    var id = ctx.params.id;
    var res = await dbHelper.find(ctx, next, student, '_id', id);
    ctx.body = res;
  },

  add: async (ctx, next)=> {
    var data = ctx.request.body;
    var res = await dbHelper.add(ctx, next, student, data);
    ctx.body = res;
  },

  update: async (ctx, next)=> {
    var id = ctx.params.id;
    var data = ctx.request.body;
    var res = await dbHelper.update(ctx, next, student, '_id', id, data);
    ctx.body = res;
  },

  delete: async (ctx, next)=> {
    var id = ctx.params.id;
    var res = await dbHelper.delete(ctx, next, student, '_id', id);
    ctx.body = res;
  }

}
