import Event from './model';

export const newEvent = async (req, res) => {
    const options = req.body;
    const newEvent = new Event(options);
    try {
        return res.status(201).json({event: await newEvent.save()});
    } catch (e) {
        return res.status(e.status).json({error: true, message: 'Database error creating Event'});
    }
};

export const getEvents = async (req, res) => {
    try {
        return res.status(200).json({events: await Event.find({})});
    } catch (e) {
        return res.status(400).json({ error: true, message: 'Database error retrieving Events'});
    }
};