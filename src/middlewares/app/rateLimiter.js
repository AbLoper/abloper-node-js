import rateLimit from 'express-rate-limit'

export const subscribeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message: 'Too many requests, please try again later'
    },
    keyGenerator: (req) => {
        return req.body.email || req.ip
    },
    standardHeaders: true,
    legacyHeaders: false
})