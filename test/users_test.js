var chai      = require('chai');
var should    = chai.should();
var expect    = chai.expect;
var supertest = require('supertest');
var api       = supertest('http://localhost:3000');
var mongoose  = require('mongoose');

var User      = require('../models/user');

var userId

beforeEach(function(done) {
  mongoose.connect('mongodb://localhost/green-app', function() {
    mongoose.connection.db.dropDatabase(function(){
      User.create({ name: "Favo" }, function(err, user){
        userId = user._id.toString();
        done(err);
      });
    });
  });
});

  //make sure we can connect and get a 200 response
describe('GET /users', function() {
    // done is similar to next() in middleware
  it('should return a 200 response', function(done) {
    api.get('/users')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
    //get an empty array in res.body
  it('should return an array', function(done) {
    api.get('/users')
    .set('Accept', 'application/json')
    .end(function(err, res) {
      expect(res.body).to.be.an('array');
      done();
    });
  });
    //recognize a name property that returns an array of objects
  it('should return an array', function(done) {
    api.get('/users')
    .set('Accept', 'application/json')
    .end(function(err, res) {
      expect(res.body[0]).to.have.property('name');
      done();
    });
  });
});

  //create/post a new user
describe('POST /users', function() {
  it('should add a new user and return the user object', function(done) {
    api.post('/users')
    .set('Accept', 'application/json')
    .send({
      name: "Acacia"
    })
    .end(function(err, res) {
      expect(res.body.name).to.equal("Acacia");
      done();
    });
  });
});

//users/:id working
describe('GET /users/:id', function() {
  it('should return the correct field', function(done) {
    api.get('/users/' + userId)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.have.property('_id', userId);
        done();
      })
  })
})


//EDIT
describe('PUT /users/:id', function() {
  it('should return 401 response', function(done) {
    api.put('/users/' + userId)
      .set('Accept', 'application/json')
      .send({
        name: "Ovaf"
      })
      .expect(200, done);
  });
  it('should return an object with an updated name', function(done) {
    api.put('/users/' + userId)
      .set('Accept', 'application/json')
      .send({
        name: "Ovaf"
      })
      .end(function(err, res) {
        expect(res.body.name).to.equal("Ovaf");
        done();
      });
  });
});

//DELETE
describe('DELETE/users/:id', function() {
  it('should respond 200', function(done) {
    api.delete('/users/' + userId)
      .set('Accept', 'application/json')
      .expect(204, done);
    });
  it('should delete the appropriate record from the database', function(done) {
    api.delete('/users/' + userId)
      .set('Accept', 'application/json')
      .end(function( err, res) {
        if(err) done(err);
        api.get('/users/' + userId)
          .set('Accept', 'application/json')
          .expect(204, done);
      });
  });
});
