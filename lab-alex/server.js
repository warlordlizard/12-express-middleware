'use strict';

const express = require('express'); 
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');
const Game = require('./model/game.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'));

app.post('/api/game', jsonParser, function (req, res, next) {
  debug('POST: /api/game');

  Game.createGame(req.body)
    .then ( game => res.json(game))
    .catch (err => {
      res.status(400).send('bad request');
      next(err);
    });
});

app.get('/api/game/:gameId', function (req, res, next) {
  debug('GET: /api/game/:gameId');

  Game.fetchGame(req.params.gameId)
    .then( game => res.json(game))
    .catch( err => {
      res.status(404).send('route not found');
      next(err);
    });
});
  
app.get('/api/game', function (req, res) {
  storage.listItems('game')
    .then((game) => {
      res.writeHead(300, {
        'Content-Type': 'application/json',
      });
      res.write('List of Games');

      res.write(JSON.stringify(game) + '\n');
      res.end();
    });
});

app.delete('/api/game/:gameId', function (req, res, next) {
  storage.deleteItem('game', req.params.gameId)
    .then(() => res.status(204))
    .catch(err => {
      res.status(404).send('route not found');
      next(err);
    });
  
});
app.use(function (err, req, res, next) {
  debug('error middleware');
  console.error(err.message);
  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen( PORT, () => {
  debug(`serve up: ${PORT}`);
});