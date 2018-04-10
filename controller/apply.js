const dbHelper = require('../helper/dbHelper.js');
const tool = require('./tool.js');
const work = require('../model/work.js');
const apply = require('../model/apply.js');
const student = require('../model/student.js');

module.exports = {
  //返回打分的
  get: async (ctx, next)=> {
    var students = await dbHelper.get(ctx, next, student);
    var works = await dbHelper.get(ctx, next, work);
    var applys = await dbHelper.get(ctx, next, apply);
    var data = [];
    var i = 0;

    applys.forEach((item)=> {
      if (item.score > 0) {
        var work = tool.findFromArray(works, '_id', item.workId);
        var student = tool.findFromArray(students, 'studentId', item.studentId);
        if (!!work && !!student) {
          data[i] = {};
          data[i].student = student;
          data[i].work = work;
          data[i].bool = item.bool;
          data[i].score = item.score;
          i++;
        }
      }
    });
    ctx.body = data;
  },
  //已打分也返回
  getAll: async (ctx, next)=> {
    var students = await dbHelper.get(ctx, next, student);
    var works = await dbHelper.get(ctx, next, work);
    var applys = await dbHelper.get(ctx, next, apply);
    var data = [];
    var i = 0;

    applys.forEach((item)=> {
      var work = tool.findFromArray(works, '_id', item.workId);
      var student = tool.findFromArray(students, 'studentId', item.studentId);
      if (!!work && !!student) {
        data[i] = {};
        data[i].student = student;
        data[i].work = work;
        data[i].bool = item.bool;
        data[i].score = item.score;
        i++;
      }
    });

    ctx.body = data;
  },
  // search: async (ctx, next)=> {
  //   var val = ctx.params.val;
  //   var res = await dbHelper.search(ctx, next, company, 'companyName', val);
  //   ctx.body = res;
  // },

  //返回岗位详情
  // find: async (ctx, next)=> {
  //   var id = ctx.params.id;
  //   var res = await dbHelper.find(ctx, next, work, '_id', id);
  //   ctx.body = res;
  // },

  add: async (ctx, next)=> {
    var data = ctx.request.body;
    var doc = new apply({
      workId : data.workId,
      studentId : data.studentId
    });
    var res = await doc.save().catch(err=> {
      console.error(err);
      ctx.throw(500, '添加数据到数据库出错');
    });

    ctx.body = res;
  },

  update: async (ctx, next)=> {
    var findCondition = {
      studentId: ctx.request.body.studentId,
      workId: ctx.request.body.workId,
    }
    var updateData = {
      bool: ctx.request.body.bool
    }
    var updates = {$set: updateData};

    var res = await apply.update(findCondition, updates).catch(err=> {
      console.error(err);
      ctx.throw(500, '更新数据出错');
    });
    ctx.body = res;
  },
  //评分
  assess: async (ctx, next)=> {
    var findCondition = {
      studentId: ctx.request.body.studentId,
      workId: ctx.request.body.workId,
    }
    var updateData = {
      score: ctx.request.body.score
    }
    var updates = {$set: updateData};
    var applys = await dbHelper.get(ctx, next, apply);
    var sum = 0;  //记录有评分的累加
    var num = 0;  //记录有评分的次数
    for (var i=0; i<applys.length; i++) {
      if((applys[i].studentId == ctx.request.body.studentId) && (applys[i].score > 0)) {
        sum += applys[i].score;
        i++;
      }
    }
    var average = parseInt(sum/num);
    await student.update({studentId: ctx.request.body.studentId}, {score: average})
    .catch(err=> {
      console.error(err);
      ctx.throw(500, '更新数据出错');
    });

    var res = await apply.update(findCondition, updates).catch(err=> {
      console.error(err);
      ctx.throw(500, '更新数据出错');
    });
    ctx.body = res;
  },
  //处理岗位调整
  adjust: async (ctx, next)=> {
    var findCondition = {
      studentId: ctx.request.body.studentId,
      workId: ctx.request.body.workId,
    }
    var updateData = {
      workId: ctx.request.body.newWorkId,
      bool: true
    }
    var updates = {$set: updateData};

    var res = await apply.update(findCondition, updates).catch(err=> {
      console.error(err);
      ctx.throw(500, '更新数据出错');
    });
    ctx.body = res;
  },
  //
  delete: async (ctx, next)=> {
    var findCondition = {
      studentId: ctx.request.query.studentId,
      workId: ctx.request.query.workId,
    };
    var res = await apply.remove(findCondition).catch(err=> {
      console.error(err);
      ctx.throw(500, '删除数据失败');
    });

    ctx.body = res;
  },

}
