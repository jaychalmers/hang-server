import * as mongoose from 'mongoose';
import {hashSync, compareSync} from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
    fullName    : {type: String, required: true},
    email       : {type: String, required: true, unique: true},
    dob         : {type: Date, required: true},
    city        : {type: String, required: true},
    postcode    : {type: String, required: true},
    avatar      : {type: String},
    providerData: {
        uid: String,
        provider: String,
    },
    interests   : [String],
    invitations : [mongoose.Schema.Types.ObjectId],
    friends     : [mongoose.Schema.Types.ObjectId],
    groups      : [mongoose.Schema.Types.ObjectId],
    photos      : [mongoose.Schema.Types.ObjectId]
}, {timestamps: true});

userSchema.statics.findOrCreate = async function (args) {
    try {
        //Check if user exists
        const user = await this.findOne({email: args.email, fullName: args.fullName});
        if (!user) {
            //If it doesn't, create it
            return await this.create(args);
        }
        //Otherwise return existing user
        return user;
    } catch (e) {
        return e;
    }
};

userSchema.methods = {
    _hashPassword(passport){
        return hashSync(password);
    },
    authenticateUser(password){
        return compareSync(password, this.password);
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});

//Create module and expose
export default mongoose.model('User',userSchema);