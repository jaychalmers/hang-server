import * as express from 'express';
import * as _ from 'lodash';

const User = require('./../database/user');
const router = express.Router();

module.exports = function(app, passport){
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
        successRedirect : '/', //redirect to
        failureRedirect : '/signup', //redirect back to the signup page if there is an error
        failureFlash : true //allow flash messages
    }));

    router.post('/login', passport.authenticate('local-login', function(err,user,info){
        if (err){
            res.error(err);
            return;
        } else if (!user) {
            res.error();
            return;
        } else
        /*
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true*/
    }));

    return router;
}