"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const User = require('./model/user');
const log = (msg) => console.log("database.users: " + msg);
module.exports = {
    newUser: function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: Add validation for unique email
            try {
                const result = yield User.create(options);
                log("Created new user with _id: " + result._id);
                return result;
            }
            catch (e) {
                log("Error creating new user: " + e);
                return e;
            }
        });
    },
    deleteUserByEmail: function (email) {
        return __awaiter(this, void 0, void 0, function* () {
            const removed = yield User.findOneAndRemove({ "email": email });
            if (removed) {
                log(removed._id + " removed.");
                return removed;
            }
            else {
                log("Failed to remove " + email);
                return null;
            }
        });
    },
    updateUserByEmail: function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            //ensure email specified
            if (!options.email) {
                log("updateUserByEmail requested, but no email specified in options");
                return new Error("Invalid Email");
            }
            const user = options.email;
            _.unset(options, "email"); //remove email from options
            try {
                const result = yield User.findOneAndUpdate({ email: user }, options, {
                    runValidators: true,
                    new: true,
                    fields: _.mapValues(options, () => { return 1; }) //selects only fields in options, object looks like eg: {name: 1, dob: 1}
                });
                log("Successfully updated user: " + result._id);
                return result;
            }
            catch (e) {
                log("Error creating new user: " + e);
                return e;
            }
        });
    },
    getUserByEmail: function (email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findOne({ "email": email });
            if (user) {
                log("Returning " + user._id);
                return user;
            }
            else {
                log("No user found with email: " + email);
                return null;
            }
        });
    }
};
