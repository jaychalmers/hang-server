import * as express from 'express';
import database from './config/database';
import middleware from './config/middleware';
import {EventRoutes, GroupRoutes, UserRoutes} from './modules';
import {devConfig} from './config/config';

const app = express();
database();
middleware(app);

//Routes
app.use('/api', [EventRoutes,GroupRoutes,UserRoutes]);

//hello world
app.get('/', (req, res) => res.send("Hello from Jays PC!"));

//Wait for requests
var listener = app.listen(devConfig.port, function() {
    console.log("Listening for new requests on: " + JSON.stringify(listener.address()));
});