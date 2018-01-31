var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//TODO: Basic behaviours, update delete etc???
const HangEvent = require('./model/event');
const log = (msg) => console.log("database.events: " + msg);
module.exports = {
    newEvent: function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield HangEvent.create(options);
                log("Created new event with _id: " + result._id);
            }
            catch (e) {
                log("Error creating new event: " + e);
                result = 500;
            }
            return result;
        });
    },
    getEvents: function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield HangEvent.find(options);
            }
            catch (e) {
                result = 500;
            }
            return result;
        });
    }
};
