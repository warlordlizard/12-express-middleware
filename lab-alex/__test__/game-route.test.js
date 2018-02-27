'use strict';

const request = require('superagent');
require('jest');
require('../server.js');
describe('Game Routes', function () {
  var game = null;
  describe('POST : api/game', function(){
    it('should post a game', function(done) {
      request.post('localhost:3000/api/game')
        .send({name: 'test game name', desc: 'test game description', genre: 'test genre'})
        .end((err, res) => {
          if(err) return done(err);
          game = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(game.name).toEqual('test game name');
          expect(game.desc).toEqual('test game description');
          expect(game.genre).toEqual('test genre');
          done();
        });
    });
    it('should return bad request id body is incorrect', function(done) {
      request.post('localhost:3000/api/game')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: api/game', function() {
    it('should return a game', function(done) {
      request.get(`localhost:3000/api/game/${game.id}`)
        .end((err, res) => {
          if (err) return done(err);
          game = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(game.name).toEqual('test game name');
          expect(game.desc).toEqual('test game description');
          expect(game.genre).toEqual('test genre');
          done();
        });
    });
    it('should return route not found', function(done) {
      request.get(`localhost:3000/api/game/:doesntexist`)
        .end((err, res) => {
          expect(err).toBeTruthy();
          expect(res.status).toEqual(404);
          done();
        });
    });

  });

  
});