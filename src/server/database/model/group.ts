import * as mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name        : {type: String, required: true},
    creator     : {type: mongoose.Schema.Types.ObjectId, required: true},
    description : {type: String, required: true},
    city        : {type: String, required: true},
    closed      : {type: Boolean, required: true},
    events      : [mongoose.Schema.Types.ObjectId],
    members     : [mongoose.Schema.Types.ObjectId],
    admins      : {type: [mongoose.Schema.Types.ObjectId], required: true},
    feedback_pos: {type: Number, required: true},
    feedback_neg: {type: Number, required: true},
    interests   : {type: [String], required: true}
});

//Create module and expose
module.exports = mongoose.model('group',groupSchema);