var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("SAMPLE unit test", function () {

    it("should return list of employees", function (done) {
        server
            .get("/api/employee")
            .expect("Content-type", /json/)
            .expect(200)
        done();
    });
})