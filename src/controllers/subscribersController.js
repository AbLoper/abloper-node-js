// subscribersController.js
import SubscriberSchema from "../models/SubscriberSchema.js";

const createSubscriber = async (req, res) => {
    const newUser = new SubscriberSchema(req.body);
    await newUser.save();
    res.status(201).json({ newUser });
};

export {
    createSubscriber
}