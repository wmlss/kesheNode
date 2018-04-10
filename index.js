const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const route = require('koa-route');
const path = require('path');
const server = require('koa-static');
const compose = require('koa-compose');
const koaBody = require('koa-body');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const test = require('./model/test.js');
const app = new Koa();

const option = {

}
const main = {

}
mongoose.connect('mongodb://127.0.0.1:27017/test');

app.use(route.get('/', function(ctx, next){
  var catSchema = mongoose.Schema({
    name: String
  });

  var Cats = mongoose.model('cat', catSchema);
  console.log(Cats.find());
}));

app.listen(3000);
