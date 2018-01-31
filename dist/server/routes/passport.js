"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const User = require('./../database/user');
const router = express.Router();
module.exports = function (app, passport) {
    /*Sign up as a new user
    router.post('/login', function(req,res,next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                res.status(500).send({error: err});
            }
            if (!user) {
                res.status(403).send("Incorrect password");
            }
        })
    });*/
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true //allow flash messages
    }));
    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));
    return router;
};
