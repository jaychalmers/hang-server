import * as mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    startTime       : {type: Date, required: true},
    endTime         : {type: Date, required: true},
    description     : {type: String},
    googlePlace    : {type: Object, required: true}
});

const eventSchema = new mongoose.Schema({
    name            : {type: String, required: true},
    group           : mongoose.Schema.Types.ObjectId,
    description     : {type: String, required: true},
    invited         : [mongoose.Schema.Types.ObjectId],
    interests       : {type: [String]},
    price           : Number,
    schedule        : {type: [scheduleSchema]}
}, {timestamps: true});

//Create module and expose
export default mongoose.model('Event',eventSchema);