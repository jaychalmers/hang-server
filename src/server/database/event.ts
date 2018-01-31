//TODO: Basic behaviours, update delete etc???
const HangEvent = require('./model/event');

const log = (msg) => console.log("database.events: " + msg);

module.exports = {
    newEvent : async function (options) {
        let result;
        try {
            result = await HangEvent.create(options);
            log("Created new event with _id: " + result._id);
        } catch (e) {
            log("Error creating new event: " + e);
            result = 500;
        }
        return result;
    },
    getEvents : async function (options) {
        let result;
        try {
            result = await HangEvent.find(options);
        } catch (e) {
            result = 500;
        }
        return result;
    }
};

