'use strict';

const express = require('express'); 
const morgan = require('morgan');
const debug = require('debug')('game: server');

const gameRouter = require('./route/game-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const Game = require('./model/game.js');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(gameRouter);
app.use(errors);

app.listen( PORT, () => {
  debug(`serve up: ${PORT}`);
});