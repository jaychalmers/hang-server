"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*** Imports and Consts ***/
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const body_parser_1 = require("body-parser");
const ip = require('ip');
const dbConfig = require('./../config/database');
/*** Database ***/
mongoose.connect(dbConfig.url, dbConfig.options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connection opened successfully");
});
/*** Express ***/
//Create express
const app = express();
//Pass passport for configuration
require('./../config/passport')(passport);
//Express middleware
app.use(body_parser_1.json());
app.use(morgan('dev'));
app.use(cookieParser());
//required for passport
app.use(session({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session
//Routes
//const passportRoutes = require('./routes/passport.js')(app,passport);
//app.use(passportRoutes);
app.use(require('./routes'));
//hello world
app.use((req, res, next) => {
    if (req.body.isRestricted) {
        console.log("This was a restricted request");
    }
    else {
        console.log("This request was fine");
    }
    next();
});
app.get('/', (req, res) => res.send("Hello from Jays PC!"));
//Wait for requests
var listener = app.listen(dbConfig.port, function () {
    console.log("Listening for new requests on: " + JSON.stringify(listener.address()));
});
