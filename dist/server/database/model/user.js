"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
//Database properties
var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    interests: [String],
    invitations: [mongoose.Schema.Types.ObjectId],
    friends: [mongoose.Schema.Types.ObjectId],
    description: String,
    groups: [mongoose.Schema.Types.ObjectId],
    photos: [mongoose.Schema.Types.ObjectId],
    //authentication properties
    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});
//Authentication stuff
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};
//Create module and expose
module.exports = mongoose.model('user', userSchema);
