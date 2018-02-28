'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('game: game-router');
const Game = require('../model/game.js');
const gameRouter = new Router();

gameRouter.post('/api/game', jsonParser, function (req, res, next) {
  debug('POST: /api/game');

  Game.createGame(req.body)
    .then(game => res.json(game))
    .catch(err => next(err));
});

gameRouter.get('/api/game/:gameId', function (req, res, next) {
  debug('GET: /api/game/:gameId');

  Game.fetchGame(req.params.gameId)
    .then(game => res.json(game))
    .catch(err => next(err));
});

gameRouter.get('/api/game', function (req, res) {
  debug('GET: /api/game');
  Game.fetchIDs()
    .then((game) => {
      res.writeHead(300, {
        'Content-Type': 'application/json',
      });
      res.write('List of Games');

      res.write(JSON.stringify(game) + '\n');
      res.end();
    })
    .catch( err => next(err)); 
});


gameRouter.put('/api/game/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/game/:id');
  Game.updateGame(req.params.id, req.body)
    .then( game => res.json(game))
    .catch( err => next(err));
});

gameRouter.delete('/api/game/:gameId', function (req, res, next) {
  debug('DELETE: /api/game/:gameId');
  Game.deleteGame(req.params.gameId, req.body)
    .then(() => res.send(204))
    // .then( game => res.json(game))
    .catch( err => next(err));
  // storage.deleteItem('game', req.params.gameId)
  //   .catch(err => {
  //     res.status(404).send('route not found');
  //     next(err);
  //   });

});

module.exports = gameRouter;