import * as express from 'express';
import * as _ from 'lodash';

const Group = require('./../database/group');
const router = express.Router();

//put routes here
router.post('/new', async (req, res) => {
    res.send("got a post request on group/new");
});

router.post('/', async (req, res) => {
    const result = await Group.getGroups(req.body);
    //TODO: Limit to how many events can be sent at once?
    if (_.isInteger(result)){
        res.sendStatus(result);
    } else {
        res.json(result);
    }
});

module.exports = router;