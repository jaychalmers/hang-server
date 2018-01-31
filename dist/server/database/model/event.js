"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    description: { type: String },
    googlePlace: { type: Object, required: true }
});
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    group: mongoose.Schema.Types.ObjectId,
    description: { type: String, required: true },
    invited: [mongoose.Schema.Types.ObjectId],
    interests: { type: [String], required: true },
    price: Number,
    schedule: { type: [scheduleSchema], required: true }
});
//Create module and expose
module.exports = mongoose.model('event', eventSchema);
