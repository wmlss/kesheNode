const dbHelper = require('../helper/dbHelper.js');
const cats = require('../model/cats.js');

module.exports = {
  test: async (ctx, next)=> {
    const n = (ctx.cookies.get('num') || 0) + 1;
    ctx.cookies.set('num', n);
    ctx.response.body = 'num:' + n; 
  },

  get: async (ctx, next)=> {
    var res =  await dbHelper.get(ctx, next, cats);
    ctx.body = res;
  },

  search: async (ctx, next)=> {
    var name = ctx.params.name;
    var res = await dbHelper.search(ctx, next, cats, 'name', name);
    ctx.body = res;
  },

  find: async (ctx, next)=> {
    var name = ctx.params.name;
    var res = await dbHelper.find(ctx, next, cats, 'name', name);
    ctx.body = res;
  },

  add: async (ctx, next)=> {
    var data = {
      name: ctx.request.body.name
    }
    var res = await dbHelper.add(ctx, next, cats, data);
    ctx.body = res;
  },

  update: async (ctx, next)=> {
    var name = ctx.params.name;
    var data = {
      name: ctx.request.body.name
    }
    var res = await dbHelper.update(ctx, next, cats, 'name', name, data);
    ctx.body = res;
  },

  delete: async (ctx, next)=> {
    var name = ctx.params.name;

    var res = await dbHelper.delete(ctx, next, cats, 'name', name);
    ctx.body = res;
  }
}
