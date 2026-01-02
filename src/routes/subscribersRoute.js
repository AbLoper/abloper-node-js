import express from 'express'
const subscribersRoute = express.Router()
import { subscribeLimiter } from '../middlewares/app/rateLimiter.js'
import { createSubscriber } from '../controllers/subscribersController.js'


subscribersRoute
    .route('/')
    // .get()
    .post(subscribeLimiter, createSubscriber)
// .patch()
// .delete()

export { subscribersRoute }