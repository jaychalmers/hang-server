const assert = require('assert');
const expect = require('chai').expect;
const request = require('request');
const url = "http://127.0.0.1:3000";

//should pass
const newModelUser = {
    name: Math.random().toString(36).substring(2,8), //string, required. Use a random 8-character string
    email: Math.random().toString(36).substring(2,8), //string, required
    dob: new Date(), //date, required
    city: Math.random().toString(36).substring(2,8), //string, required
    postcode: Math.random().toString(36).substring(2,8),
    interests: ["interest"], //this should be an enum check later
    invitations: null, //later try this against existing?
    friends: null, //later try this against existing?
    description: Math.random().toString(36).substring(2,8),
    groups: null, //later try this against existing?
    photos: null //later try this against existing?
};
//lacking required fields
const lackingRequiredFields = {
    name: Math.random().toString(36).substring(2,8)
};

describe('user/', function() {

    describe('new/', function () {
        var options = {
            url: url + "/user/new",
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json"
            }
        };

        it('should return a 200 confirmation if user is created successfully', function (done) {
            options.body = newModelUser;
            request(options, function (error, response, body) {
                done();
                expect(response.statusCode).to.equal(200);
            });
        });

        it('should return a 500 server error when options lack required fields', function(done) {
            options.body = lackingRequiredFields;
            request(options, function (error, response, body) {
                done();
                expect(response.statusCode).to.equal(500);
            });
        });

    });

    describe('update-by-email/', function () {

        var options = {
            url: url + "/user/update-by-email",
            method: "PUT",
            json: true,
            headers: {
                "content-type": "application/json"
            }
        };

        it('should return a 200 server confirmation if successful', function (done) {
            options.body = newModelUser;
            options.body.name = "modified name";
            request(options, function (error, response) {
                done();
                expect(response.statusCode).to.equal(200);
            });
        });

        it('should return a 500 server confirmation if email identifier is missing', function(done) {
            options.body = lackingRequiredFields;
            request(options, function (error, response) {
                done();
                expect(response.statusCode).to.equal(500);
            });
        });

    });

});