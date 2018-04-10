const dbHelper = require('../helper/dbHelper.js');
const work = require('../model/work.js');

module.exports = {
  get: async (ctx, next)=> {
    var res =  await dbHelper.get(ctx, next, work);
    ctx.response.status = 200;
    ctx.body = res;
  },

  search: async (ctx, next)=> {
    var val = ctx.params.val;
    var res = await dbHelper.search(ctx, next, work, 'workName', val);
    ctx.body = res;
  },

  find: async (ctx, next)=> {
    var id = ctx.params.id;
    var res = await dbHelper.find(ctx, next, work, '_id', id);
    ctx.body = res;
  },

  add: async (ctx, next)=> {
    var data = ctx.request.body;
    var res = await dbHelper.add(ctx, next, work, data);
    ctx.body = res;
  },

  update: async (ctx, next)=> {
    var id = ctx.params.id;
    var data = ctx.request.body;
    var res = await dbHelper.update(ctx, next, work, '_id', id, data);
    ctx.body = res;
  },

  delete: async (ctx, next)=> {
    var id = ctx.params.id;
    var res = await dbHelper.delete(ctx, next, work, '_id', id);
    ctx.body = res;
  }

}
