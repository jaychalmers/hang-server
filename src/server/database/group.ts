//TODO: Basic behaviours, update delete etc???
const HangGroup = require('./model/group');


module.exports = {
    getGroups : async function (options) {
        let result;
        try {
            result = await HangGroup.find(options);
        } catch (e) {
            result = 500;
        }
        return result;
    }
};

