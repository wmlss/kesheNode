'use strict'

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/test';
const Koa = require('koa');
const app = new Koa();
const router = require('./router/router.js');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
// connect to db
mongoose.connect(db);
app.use(cors());
app.use(bodyParser());
app.use(router().routes());

app.listen(3000);
console.log('app started at port 3000');
