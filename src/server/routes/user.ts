//TODO - decide what do with signup/passport behaviour

import * as express from 'express';
import * as _ from 'lodash';

const User = require('./../database/user');
const router = express.Router();

module.exports = function(passport){
    /*Sign up as a new user
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', //redirect to
        failureRedirect : '/signup', //redirect back to the signup page if there is an error
        failureFlash : true //allow flash messages
    }));*/

    /*Create a new user
    router.post('/new', async (req, res) => {
        const result = await User.newUser(req.body);
        res.sendStatus(_.isError(result) ? 500 : 200);
    });
    */

    /*Update a user using email as identifier*/
    router.put('/update-by-email', async (req, res) => {
        const result = await User.updateUserByEmail(req.body);
        res.sendStatus(_.isError(result) ? 500 : 200);
    });

    /*Delete a user using email as identifier*/
    router.delete('/delete-by-email/:email', async (req, res) => {
        const result = await User.deleteUserByEmail(req.params.email);
        res.sendStatus( result ? 200 : 500);
    });

    /*Get a user using email as identifier*/
    router.get('/get-by-email/:email', async (req, res) => {
        const result = await User.getUserByEmail(req.params.email);
        if (result){
            res.json(result);
        } else {
            res.sendStatus(500);
        }
    });

    router.get('/test/:user/:public', (req,res) => {
        console.log("Hello1111");
        if (req.params.public == "true"){
            res.send("This was a public thing, and was fine!");
        } else if (req.params.user == "jay"){
            res.send("This was a private thing, but since it's you, we'll let you through");
        } else {
            res.send("I'm afraid we're at capacity.")
        }
    });

    return router;
};