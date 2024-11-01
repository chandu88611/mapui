import Queue from 'bull';
import path from 'path';
import csv from 'csv-parser';
import fs from 'fs';
import Weather from '../models/weather.js';

const csvQueue = new Queue('csv-processing', {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1', 
    port: process.env.REDIS_PORT || 6379,        
    password: process.env.REDIS_PASSWORD || '',  
  },
});

csvQueue.process(async (job) => {
  const { filePath } = job.data;

  try {
    const weatherData = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const { timestamp, temperature, humidity, windSpeed, precipitation, pressure, location } = row;
          weatherData.push({
            timestamp: new Date(timestamp),
            temperature: parseFloat(temperature),
            humidity: parseFloat(humidity),
            windSpeed: parseFloat(windSpeed || 0),
            precipitation: parseFloat(precipitation || 0),
            pressure: parseFloat(pressure || 0),
            location,
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    for (const weather of weatherData) {
      await Weather.findOneAndUpdate(
        { location: weather.location },
        weather,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    console.log('CSV processing completed');
  } catch (error) {
    console.error('Error processing job:', error);
    throw new Error('Failed to process CSV job');
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

export default csvQueue;
