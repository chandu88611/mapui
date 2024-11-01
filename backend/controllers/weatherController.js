import asyncHandler from 'express-async-handler';
import Weather from '../models/weather.js';
 
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import csvQueue from '../queues/csvQueues.js';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => Math.min(times * 100, 3000),
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: 'uploads/' });

// Middleware function to check Redis cache
const checkCache = async (req, res, next) => {
  const { page, limit, location, date } = req.query;
  const cacheKey = `weather_${page}_${limit}_${location || 'all'}_${date || 'all'}`;

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    req.cacheKey = cacheKey; 
    next();
  } catch (error) {
    console.error('Error checking cache:', error);
    next();
  }
};

const getWeather = asyncHandler(async (req, res) => {
  const { page = 1, limit = 6, location, date } = req.query;

  const query = {};
  if (location) query.location = location;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    query.timestamp = { $gte: start, $lt: end };
  }

  const skip = (page - 1) * limit;
  const [weatherData, total] = await Promise.all([
    Weather.find(query).skip(skip).limit(parseInt(limit)),
    Weather.countDocuments(query),
  ]);

  const responseData = {
    data: weatherData,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    },
  };

  try {
    await redisClient.set(req.cacheKey, JSON.stringify(responseData), 'EX', 3600);
  } catch (error) {
    console.error('Error setting cache:', error);
  }

  res.json(responseData);
});

 
 
// const importWeatherDataFromCSV = asyncHandler(async (req, res) => {
//   console.log('Request body:', req.body);

//   if (!req.body.fileName || !req.body.fileData) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   const fileData = req.body.fileData;
//   const tempFilePath = path.join(__dirname, '../uploads/temp.csv');

//   try {
//     // Convert base64 string to Buffer
//     const fileBuffer = Buffer.from(fileData, 'base64');
//     console.log('File buffer created successfully');

//     // Write the Buffer to a temporary file
//     fs.writeFileSync(tempFilePath, fileBuffer);
//     console.log(`File written to ${tempFilePath}`);

//     const weatherData = [];

//     // Parse the CSV file
//     fs.createReadStream(tempFilePath)
//       .pipe(csv())
//       .on('data', (row) => {
//         console.log('Row parsed:', row);
//         const { timestamp, temperature, humidity, windSpeed, precipitation, pressure, location } = row;
//         weatherData.push({
//           timestamp: new Date(timestamp),
//           temperature: parseFloat(temperature),
//           humidity: parseFloat(humidity),
//           windSpeed: parseFloat(windSpeed || 0),
//           precipitation: parseFloat(precipitation || 0),
//           pressure: parseFloat(pressure || 0),
//           location,
//         });
//       })
//       .on('end', async () => {
//         console.log('CSV file parsing completed');
//         try {
//           for (const weather of weatherData) {
//             await Weather.findOneAndUpdate(
//               { location: weather.location },
//               weather,
//               { upsert: true, new: true, setDefaultsOnInsert: true }
//             );
//           }
//           res.status(200).json({ message: 'Weather data imported and updated successfully from CSV' });
//         } catch (dbError) {
//           console.error('Database error:', dbError);
//           res.status(500).json({ message: 'Failed to save data to the database' });
//         } finally {
//           fs.unlinkSync(tempFilePath);
//           console.log(`Temporary file ${tempFilePath} deleted`);
//         }
//       })
//       .on('error', (error) => {
//         console.error('Error reading CSV:', error);
//         res.status(500).json({ message: 'Error reading CSV data' });
//         fs.unlinkSync(tempFilePath);
//       });
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     res.status(500).json({ message: 'Failed to import weather data' });
//     if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
//   }
// });
const importWeatherDataFromCSV = asyncHandler(async (req, res) => {
  if (!req.body.fileName || !req.body.fileData) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileData = req.body.fileData;
  const tempFilePath = path.join(__dirname, '../uploads/temp.csv');

  try {
    const fileBuffer = Buffer.from(fileData, 'base64');
    fs.writeFileSync(tempFilePath, fileBuffer);

    // Add the file path to the queue for processing
    csvQueue.add({ filePath: tempFilePath });

    res.status(200).json({ message: 'CSV file uploaded and queued for processing' });
  } catch (error) {
    console.error('Error uploading CSV file:', error);
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    res.status(500).json({ message: 'Failed to enqueue CSV for processing' });
  }
});

const createWeather = asyncHandler(async (req, res) => {
  const { timestamp, temperature, humidity, windSpeed, precipitation, pressure, location } = req.body;

  const weather = new Weather({
    timestamp,
    temperature,
    humidity,
    windSpeed,
    precipitation,
    pressure,
    location,
  });

  const createdWeather = await weather.save();
  req.io.emit('weatherDataCreated', weather); 
  res.status(201).json(createdWeather);
});


// const getWeather = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 10, location, date } = req.query;

//   const query = {};
//   if (location) query.location = location;
//   if (date) {
//     const start = new Date(date);
//     const end = new Date(date);
//     end.setDate(end.getDate() + 1);
//     query.timestamp = { $gte: start, $lt: end };
//   }

//   const skip = (page - 1) * limit;
//   const [weatherData, total] = await Promise.all([
//     Weather.find(query).skip(skip).limit(parseInt(limit)),
//     Weather.countDocuments(query),
//   ]);

//   res.json({
//     data: weatherData,
//     pagination: {
//       total,
//       page: parseInt(page),
//       limit: parseInt(limit),
//     },
//   });
// });
 
const getWeatherById = asyncHandler(async (req, res) => {
  const weather = await Weather.findById(req.params.id);

  if (weather) {
    res.json(weather);
  } else {
    res.status(404);
    throw new Error('Weather data not found');
  }
});
 
const updateWeather = asyncHandler(async (req, res) => {
  const weather = await Weather.findById(req.params.id);

  if (weather) {
    weather.timestamp = req.body.timestamp || weather.timestamp;
    weather.temperature = req.body.temperature || weather.temperature;
    weather.humidity = req.body.humidity || weather.humidity;
    weather.windSpeed = req.body.windSpeed || weather.windSpeed;
    weather.precipitation = req.body.precipitation || weather.precipitation;
    weather.pressure = req.body.pressure || weather.pressure;
    weather.location = req.body.location || weather.location;

    const updatedWeather = await weather.save();
    req.io.emit('weatherDataUpdated', updatedWeather);
    res.json(updatedWeather);
  } else {
    res.status(404);
    throw new Error('Weather data not found');
  }
});
 
const deleteWeather = asyncHandler(async (req, res) => {

  const weather = await Weather.findById(req.params.id);
  
  if (weather) {
    await Weather.findOneAndDelete(req.params.id);
    req.io.emit('weatherDataDeleted', req.params.id);
    res.json({ message: 'Weather data removed' });
  } else {
    res.status(404);
    throw new Error('Weather data not found');
  }
});

export { 
  importWeatherDataFromCSV, 
  createWeather, 
  getWeather, 
  getWeatherById, 
  updateWeather, upload,
  deleteWeather ,checkCache
};
