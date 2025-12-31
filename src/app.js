import morgan from "morgan";
import cors from "cors";
import express from "express";
import { subscribersRoute } from "./routes/subscribersRoute.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    // "https://godaddy.com",
    // "https://www.godaddy.com",
    "https://abloper.com",
    "https://www.abloper.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ===============================
// Global Middlewares
// ===============================
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// ===============================
// Routes
// ===============================
app.use("/api/subscribers", subscribersRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

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
    status: "error",
    message: err.isOperational ? err.message : "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
