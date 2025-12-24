// subscribersController.js
import Subscriber from "../models/subscriber.js";

const createSubscriber = async (req, res) => {
    const newUser = new Subscriber(req.body);
    await newUser.save();
    res.status(201).json({ newUser });
};

export {
    createSubscriber
}