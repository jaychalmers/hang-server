import * as express from 'express';
import * as _ from 'lodash';

const Event = require('./../database/event');
const router = express.Router();

/*Create a new event*/
router.post('/new', async (req, res) => {
    const result = await Event.newEvent(req.body);
    if (_.isInteger(result)){
        res.sendStatus(result);
    } else {
        res.send(result);
    }
});

router.post('/', async (req, res) => {
    const result = await Event.getEvents(req.body);
    //TODO: Limit to how many events can be sent at once?
    if (_.isInteger(result)){
        res.sendStatus(result);
    } else {
        res.json(result);
    }
});

module.exports = router;