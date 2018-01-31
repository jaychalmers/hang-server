import * as mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
    event       : {type: mongoose.Schema.Types.ObjectId, required: true},
    user        : {type: mongoose.Schema.Types.ObjectId, required: true},
    attending   : Boolean
});

//Create module and expose
module.exports = mongoose.model('invitation',invitationSchema);