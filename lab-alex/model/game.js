'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('game:game');
const storage = require('../lib/storage.js');

const Game = module.exports = function(name, desc, genre) {
  debug(' Game constructor');
  if(!name) throw new Error('expected name');
  if(!desc) throw new Error('expected description');
  if(!genre) throw new Error('expected genre');

  this.id = uuidv4();
  this.name = name;
  this.desc = desc;
  this.genre = genre;
};
Game.createGame = function (_game) {
  debug('createGame');
  try {
    let game = new Game(_game.name, _game.desc, _game.genre);
    return storage.createItem('game', game);
  } catch (err) {
    return Promise.reject(err);
  }
};

Game.fetchGame = function(id) {
  debug('fetchGame');
  return storage.fetchItem('game', id);
};

Game.updateGame = function(id, _game) {
  debug('updateGame');

  return storage.fetchItem('game', id)
    .then( game => {
      for( var prop in game) {
        if(prop === 'id') continue;
        if(_game[prop]) game[prop] = _game[prop];
      }
      return storage.createItem('game', game);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

Game.deleteGame = function(id) {
  debug('deleteGame');
  return storage.deleteItem('game', id);
};

Game.fetchIDs = function() {
  debug('fetchIDs');
  return storage.fetchIDs('game');
};