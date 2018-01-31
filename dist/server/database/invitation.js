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
const Invitation = require('./model/invitation');
const log = (msg) => console.log("database.invitations: " + msg);
module.exports = {
    newInvitation: function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Invitation.create(options);
                log("Created new invitation with _id: " + result._id);
                return result;
            }
            catch (e) {
                log("Error creating new user: " + e);
                return e;
            }
        });
    },
    deleteInvitationById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const removed = yield Invitation.findByIdAndRemove(id);
            if (removed) {
                log(removed._id + " removed.");
                return removed;
            }
            else {
                log("Failed to remove " + id);
                return null;
            }
        });
    },
    getInvitationById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield Invitation.findById(id);
            if (invitation) {
                log("Returning " + invitation._id);
                return invitation;
            }
            else {
                log("No user found with id: " + id);
                return null;
            }
        });
    }
};
