const dbHelper = require('../helper/dbHelper.js');
const company = require('../model/company.js');

module.exports = {
  get: async (ctx, next)=> {
    var res =  await dbHelper.get(ctx, next, company);
    ctx.body = res;
  },

  search: async (ctx, next)=> {
    var val = ctx.params.val;
    var res = await dbHelper.search(ctx, next, company, 'companyName', val);
    ctx.body = res;
  },

  find: async (ctx, next)=> {
    var id = ctx.params.id;
    var res = await dbHelper.find(ctx, next, company, '_id', id);
    ctx.body = res;
  },

  add: async (ctx, next)=> {
    var data = ctx.request.body;
    var res = await dbHelper.add(ctx, next, company, data);
    ctx.body = res;
  },

  update: async (ctx, next)=> {
    var id = ctx.params.id;
    var data = ctx.request.body;
    var res = await dbHelper.update(ctx, next, company, '_id', id, data);
    ctx.body = res;
  },

  delete: async (ctx, next)=> {
    var id = ctx.params.id;
    var res = await dbHelper.delete(ctx, next, company, '_id', id);
    ctx.body = res;
  }

}
