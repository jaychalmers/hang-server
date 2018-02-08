import * as express from 'express';
import * as Event from './controller';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const router = express.Router();

router.post('/events/new', Event.newEvent);
router.post('/events', requireJwtAuth, Event.getEvents);

export default router;