const dbHelper = require('../helper/dbHelper.js');
const tool = require('./tool.js');
const student = require('../model/student.js');

module.exports = {
  login: async (ctx, next)=> {
      var id = ctx.request.body.id;
      var psd = ctx.request.body.psd;

      if (id == 'root' && psd == 'root') {
        tool.response(ctx, 200, {
          msg: '登录成功'
        });
        return ;
      }

      tool.response(ctx, 401, {
        msg: '登录信息错误'
      });
      return ;
  },

  isLogin: async (ctx, next)=> {
      //管理员判断
      var id = ctx.header.authorization;

      //id存在且匹配对应则已登录
      if (id == 'root') {
        await next();
        return ;
      }
      //学生判断
      var students =  await dbHelper.get(ctx, next, student);

      //id存在且匹配对应则已登录
      if (!!id) {
        for (var i=0; i<students.length; i++) {
          if (id == students[i].studentId) {
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
}
