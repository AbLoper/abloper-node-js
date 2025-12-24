import express from 'express'
const subscribersRouter = express.Router()

import { createSubscriber } from '../controllers/subscribersController.js'


subscribersRouter
    .route('/')
    // .get()
    .post(createSubscriber)
// .patch()
// .delete()

export { subscribersRouter }