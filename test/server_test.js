"use strict";
const expect = require('chai').expect;
const request = require('supertest')('http://localhost:3000');
const server = require('./../server/server');

describe('GET index.html', () => {
  it(`should respond to GET request for '/' with 200`,
  done => {
    request
      .get('/')
      .expect(200, done);
  });
});

// describe('')
