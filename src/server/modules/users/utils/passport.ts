import * as passport from 'passport';
import * as JWT from 'passport-jwt';

import User from '../model';
import {devConfig} from '../../../config/config';

const jwtOpts = {
    jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: devConfig.jwt_secret,
};

const jwtStrategy = new JWT.Strategy(jwtOpts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) {
            done(null,user);
        } else {
            done(null,false);
        }
    } catch (e) {
        return done(e, false);
    }
});

passport.use(jwtStrategy);