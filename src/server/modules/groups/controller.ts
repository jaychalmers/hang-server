import Group from './model';

export const createGroup = async (req, res) => {

    const {
        name,
        creator,
        description,
        city,
        closed,
        events = [],
        members = [creator],
        admins = [creator],
        feedback_pos = 0,
        feedback_neg = 0,
        interests
    } = req.body;

    const group = new Group({
        name: name,
        creator: creator,
        description: description,
        city: city,
        closed: closed,
        events: events,
        members: members,
        admins: admins,
        feedback_pos: feedback_pos,
        feedback_neg: feedback_neg,
        interests: interests
    });

    console.log(group);

    try {
        return res.status(201).json({error: false, group: await group.save()});
    } catch (e) {
        return res.status(400).json({error: true, message: "Error creating group"});
    }

/*
    if (!name) {
        return error(res,"Name was not provided");
    } else if (typeof name !== 'string') {
        return error(res,"Name must be a string");
    }
*/
};

export const getGroups = async (req, res) => {
    try {
        return res.status(200).json({events: await Group.find({})});
    } catch (e) {
        return res.status(400).json({ error: true, message: 'Database error retrieving Groups'});
    }
};

