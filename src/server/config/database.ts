import * as mongoose from 'mongoose';

const url = 'mongodb://localhost/hang';
const port = 3000;
const options = {
    useMongoClient: true
};

export default () => {
    (<any>mongoose).Promise = require('bluebird');
    mongoose.connect(url,options);
    mongoose.set('debug',true);
    mongoose.connection
        .once('open', () => console.log("Database connection open successfully"))
        .on('error', err => console.error(err));
};