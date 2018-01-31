import * as _ from 'lodash';

const User = require('./model/user');
const log = (msg) => console.log("database.users: " + msg);

module.exports = {
    newUser : async function (options) {
        //TODO: Add validation for unique email
        try {
            const result:any = await User.create(options);
            log("Created new user with _id: " + result._id);
            return result;
        } catch (e) {
            log("Error creating new user: " + e);
            return e;
        }
    },

    deleteUserByEmail : async function (email) {
        const removed = await User.findOneAndRemove({"email": email});
        if (removed) {
            log(removed._id + " removed.");
            return removed;
        } else {
            log("Failed to remove " + email);
            return null;
        }
    },

    updateUserByEmail : async function (options) {
        //ensure email specified
        if (!options.email) {
            log("updateUserByEmail requested, but no email specified in options");
            return new Error("Invalid Email");
        }

        const user = options.email;
        _.unset(options,"email"); //remove email from options
        try {
            const result = await User.findOneAndUpdate(
                {email: user},
                options,
                {
                    runValidators: true,
                    new: true,
                    fields: _.mapValues(options, () => {return 1;}) //selects only fields in options, object looks like eg: {name: 1, dob: 1}
                }
            );
            log("Successfully updated user: " + result._id);
            return result;
        } catch (e) {
            log("Error creating new user: " + e);
            return e;
        }
    },

    getUserByEmail : async function (email) {
        const user = await User.findOne({"email": email});
        if (user) {
            log("Returning " + user._id);
            return user;
        } else {
            log("No user found with email: " + email);
            return null;
        }
    }
};
