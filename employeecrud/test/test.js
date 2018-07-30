const express = require('express');
const request = require('request');
const chai = require('chai');
const expect = chai.expect;

const app = express();

it('returns a list of posts', function (done) {
    request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});