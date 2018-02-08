import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

export default app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(passport.initialize());
};