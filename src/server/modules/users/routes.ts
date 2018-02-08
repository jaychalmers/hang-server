import * as express from 'express';
import * as UserController from './controller';

const router = express.Router();

router.post('/users/auth0', UserController.loginWithAuth0);

export default router;