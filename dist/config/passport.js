const LocalStrategy = require('passport-local').Strategy;
const User = require('./../server/database/model/user');
module.exports = function (passport) {
    /*** Passport Session Setup ***/
    // Required for persistent login sessions
    // Passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (error, user) {
            done(error, user);
        });
    });
    /*** LOCAL LOGIN ***/
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            return done(null, user);
        });
    }));
    /*** LOCAL SIGNUP ***/
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        //async
        //User.findOne wont fire unless data is sent back
        process.nextTick(function () {
            //find a user whose email is the same as the forms email
            //we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email': email }, function (error, user) {
                //if there are any errors, return the error
                if (error)
                    return done(error);
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'Email already in use'));
                }
                else {
                    //if there is no user with that email
                    //create the user
                    const newUser = new User();
                    //set the user's local credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    //save the user
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
