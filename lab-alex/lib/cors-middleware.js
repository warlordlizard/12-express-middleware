'use strict';

const debug = require('debug')('game: cors-middleware');

module.exports = function(req, res, next) {
  debug('cors middleware');
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', '*');
  next();
};