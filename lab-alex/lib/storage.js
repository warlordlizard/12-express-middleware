'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const createError = require('http-errors');

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!item) return Promise.reject(createError(400,'expected item'));
  
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(createError(400,'expected schema name'));
  if (!id) return Promise.reject(createError(400,'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch( err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`);
};

exports.listItems = function(schemaName) {
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`);
};