import express from 'express'
const subscribersRoute = express.Router()

import { createSubscriber } from '../controllers/subscribersController.js'


subscribersRoute
    .route('/')
    // .get()
    .post(createSubscriber)
// .patch()
// .delete()

export { subscribersRoute }