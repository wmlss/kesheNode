'use strict'
//增删查改的帮助文件
const mongodb = require('mongodb');
const mongoose = require('mongoose');

module.exports = {
  get: async (ctx, next, model)=> {
    var query = model.find({});

    return await query.exec().catch(err=> {
      console.error(err);
      ctx.throw(500, '获取数据出错');
    });
    ctx.status = 200;
    ctx.body = res;
  },

  find: async (ctx, next, model, field, findedVal)=> {
    var findField = field ? field : 'id'; //查找的字段默认id
    findedVal = findedVal ? findedVal : ctx.params.id;  //查找的字段的值默认为url后的id
    var findCondition = {}  //查找的条件
    findCondition[findField] = findedVal;
    var query = model.find(findCondition);

    return await query.exec().catch(err=> {
      console.error(err);
      ctx.throw(500, '根据ID查询数据出错');
    });
  },

  search: async (ctx, next, model, field, searchVal)=> {
    var reg = new RegExp(searchVal, 'i');
    var searchCondition = {}  //搜索的条件
    searchCondition[field] = reg

    var query = model.find(searchCondition);
    return await query.exec().catch(err=> {
      console.error(err);
      ctx.throw(500, '模糊搜索数据库出错');
    });
  },

  add: async (ctx, next, model, addData)=> {
    var name = ctx.request.body.name;
    var doc = new model(addData);

    return await doc.save().catch(err=> {
      console.error(err);
      ctx.throw(500, '添加数据到数据库出错');
    });
  },

  update: async function(ctx, next, model, field, findedVal, updateData) {
    var findField = field ? field : 'id'; //查找的字段默认id
    findedVal = findedVal ? findedVal : ctx.params.id;  //查找的字段的值默认为url后的id
    var findCondition = {}  //查找的条件
    findCondition[findField] = findedVal;
    var updates = {$set: updateData};

    return await model.update(findCondition, updates).catch(err=> {
      console.error(err);
      ctx.throw(500, '更新数据出错');
    });
  },

  delete: async function(ctx, next, model, field, findedVal) {
    var findField = field ? field : 'id'; //查找的字段默认id
    findedVal = findedVal ? findedVal : ctx.params.id;  //查找的字段的值默认为url后的id
    var findCondition = {}  //查找的条件
    findCondition[findField] = findedVal

    return await model.remove(findCondition).catch(err=> {
      console.error(err);
      ctx.throw(500, '删除数据失败');
    });
  }
}
