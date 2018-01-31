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
const Event = require('./../database/event');
const router = express.Router();
/*Create a new event*/
router.post('/new', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Event.newEvent(req.body);
    if (_.isInteger(result)) {
        res.sendStatus(result);
    }
    else {
        res.send(result);
    }
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Event.getEvents(req.body);
    //TODO: Limit to how many events can be sent at once?
    if (_.isInteger(result)) {
        res.sendStatus(result);
    }
    else {
        res.json(result);
    }
}));
module.exports = router;
