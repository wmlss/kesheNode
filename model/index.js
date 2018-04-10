'use strict'
const fs = require('fs');
const models = {};
const files = fs.readdirSync(__dirname);

for(let file of files) {
  if (file != 'index.js') {
    var fileName = file.split('.')[0];
    models[fileName] = require('./' + fileName);
  }
}

module.exports = models;
