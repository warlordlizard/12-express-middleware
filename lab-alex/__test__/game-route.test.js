'use strict';

const request = require('superagent');
require('jest');
require('../server.js');
const url = 'http://localhost:3000';

describe('Game Routes', function () {
  var game = null;
  describe('POST : api/game', function(){
    describe('with a valid id', function(){
      it('should post a game', function(done) {
        request.post(`${url}/api/game`)
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
    });
    describe('with an invalid id', function () {
      it('should respond with a 404', done => {
        request.get(`${url}/api/note/12345678`)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });

  describe('GET: api/game', function() {
    it('should return a game', function(done) {
      request.get(`${url}/api/game/${game.id}`)
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
      request.get(`${url}/api/game/:doesntexist`)
        .end((err, res) => {
          expect(err).toBeTruthy();
          expect(res.status).toEqual(404);
          done();
        });
    });

  });
  describe('PUT: /api/game/', function() {
    describe('with a valid id', function () {
      it('should update game', function(done) {
        let updateGame = {name: 'updated name', desc: 'updated desc', genre: 'updated genre'};
        request.put(`${url}/api/game/${game.id}`)
          .send(updateGame)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(game.id);
            done();
          });
      });
    });
    describe('with an invalid id', function () {
      it('should return an error', function (done) {
        let updateGame2 = {name: 'updated name', desc: 'updated desc', genre: 'updated genre'};
        request.put(`${url}/api/note/12345678`)
          .send(updateGame2)
          .end((err, res) => {
            expect(err).toBeTruthy();
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
  
});