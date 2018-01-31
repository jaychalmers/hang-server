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
const express = require("express");
const _ = require("lodash");
const Invitation = require('./../database/invitation');
const router = express.Router();
/*Create a new user*/
router.post('/new', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Invitation.newInvitation(req.body);
    res.sendStatus(_.isError(result) ? 500 : 200);
}));
router.delete('/delete-by-id/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const removed = yield Invitation.deleteInvitationById(req.params.id);
    res.sendStatus(removed ? 200 : 500);
}));
router.get('/get-by-id/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const invitation = yield Invitation.getInvitationById(req.params.id);
    if (invitation) {
        res.json(invitation);
    }
    else {
        res.sendStatus(500);
    }
}));
module.exports = router;
