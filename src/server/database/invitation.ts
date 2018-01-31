import * as _ from 'lodash';

const Invitation = require('./model/invitation');
const log = (msg) => console.log("database.invitations: " + msg);

module.exports = {
    newInvitation : async function (options) {
        try {
            const result:any = await Invitation.create(options);
            log("Created new invitation with _id: " + result._id);
            return result;
        } catch (e) {
            log("Error creating new user: " + e);
            return e;
        }
    },

    deleteInvitationById : async function (id) {
        const removed = await Invitation.findByIdAndRemove(id);
        if (removed) {
            log(removed._id + " removed.");
            return removed;
        } else {
            log("Failed to remove " + id);
            return null;
        }
    },

    getInvitationById : async function (id) {
        const invitation = await Invitation.findById(id);
        if (invitation) {
            log("Returning " + invitation._id);
            return invitation;
        } else {
            log("No user found with id: " + id);
            return null;
        }
    }

};