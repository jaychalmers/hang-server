/*** Imports and Consts ***/
import * as mongoose from 'mongoose';
import * as express from 'express';

import * as passport from 'passport';
import * as flash from 'connect-flash';

import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { json } from 'body-parser';

const ip = require('ip');

const dbConfig = require('./../config/database');

/*** Database ***/
mongoose.connect(dbConfig.url, dbConfig.options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => {
    console.log("Database connection opened successfully");
});

/*** Express ***/
//Create express
const app = express();

//Pass passport for configuration
require('./../config/passport')(passport);

//Express middleware
app.use(json());
app.use(morgan('dev'));
app.use(cookieParser());

//required for passport
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

//Routes
//const passportRoutes = require('./routes/passport.js')(app,passport);
//app.use(passportRoutes);
app.use(require('./routes'));

//hello world
app.get('/', (req, res) => res.send("Hello from Jays PC!"));

//Wait for requests
var listener = app.listen(dbConfig.port, function() {
    console.log("Listening for new requests on: " + JSON.stringify(listener.address()));
});