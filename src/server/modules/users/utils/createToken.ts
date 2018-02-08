import * as jwt from 'jsonwebtoken';
import {devConfig} from '../../../config/config';

export const createToken = args => jwt.sign({id: args._id }, devConfig.jwt_secret);