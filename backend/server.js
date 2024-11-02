// import path from 'path';
// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import userRoutes from './routes/userRoutes.js';
// import weatherRoutes from './routes/weatherRoutes.js';
// import cors from 'cors';
// import rateLimit from 'express-rate-limit';

// // Create a rate limiter middleware
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per window
//   message: 'Too many requests from this IP, please try again later.',
// });
// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:3000', 'http://localhost:5173'],
//   },
// });

// const port = process.env.PORT || 5000;

// app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use('/api/', apiLimiter);
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// app.use('/api/user', userRoutes);
// app.use('/api/weather', weatherRoutes);

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, '/frontend/dist')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running...');
//   });
// }

// app.use(notFound);
// app.use(errorHandler);

// server.listen(port, () => console.log(`Server started on port ${port}`));

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);
//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });
import path from 'path';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

dotenv.config();  // Load environment variables

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:5173'],
  },
});

const port = process.env.PORT || 5000;

// Rate limiter using environment variables
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // Default: 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Default: 100 requests
  message: 'Too many requests from this IP, please try again later.',
});

// app.use(cors({ origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/', apiLimiter);
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/weather', weatherRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

server.listen(port, () => console.log(`Server started on port ${port}`));

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
