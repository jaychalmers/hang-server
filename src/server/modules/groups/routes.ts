import * as express from 'express';
import * as Group from './controller';

const router = express.Router();

router.post('/groups/create', Group.createGroup);
router.post('/groups', Group.getGroups);

export default router;