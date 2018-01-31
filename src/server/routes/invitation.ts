import * as express from 'express';
import * as _ from 'lodash';

const Invitation = require('./../database/invitation');
const router = express.Router();

/*Create a new user*/
router.post('/new', async (req, res) => {
    const result = await Invitation.newInvitation(req.body);
    res.sendStatus(_.isError(result) ? 500 : 200);
});

router.delete('/delete-by-id/:id', async (req, res) => {
    const removed = await Invitation.deleteInvitationById(req.params.id);
    res.sendStatus( removed ? 200 : 500);
});

router.get('/get-by-id/:id', async (req, res) => {
    const invitation = await Invitation.getInvitationById(req.params.id);
    if (invitation) {
        res.json(invitation);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;