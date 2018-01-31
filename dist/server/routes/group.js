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
const Group = require('./../database/group');
const router = express.Router();
//put routes here
router.post('/new', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send("got a post request on group/new");
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Group.getGroups(req.body);
    //TODO: Limit to how many events can be sent at once?
    if (_.isInteger(result)) {
        res.sendStatus(result);
    }
    else {
        res.json(result);
    }
}));
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ;
}));
module.exports = router;