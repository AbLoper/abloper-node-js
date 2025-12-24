// src/app.js

import express from 'express';
import morgan from 'morgan';

import { subscribersRouter } from './routes/subscribersRouter.js';

// ===============================
// App Init
// ===============================
const app = express();

// ===============================
// Global Middlewares
// ===============================
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// ===============================
// Routes
// ===============================
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the API',
  });
});

app.use('/api/subscribers', subscribersRouter);

// ===============================
// 404 Handler
// ===============================
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
