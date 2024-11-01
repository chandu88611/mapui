import express from 'express';
import {
  importWeatherDataFromCSV,
  createWeather,
  getWeather,
  getWeatherById,
  updateWeather,
  deleteWeather,
  upload,
  checkCache,
} from '../controllers/weatherController.js';
import { authorizeManagerOrAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/import-csv',protect,authorizeManagerOrAdmin, upload.single('file'), importWeatherDataFromCSV); // Import weather data from CSV
router.post('/', protect,authorizeManagerOrAdmin,createWeather); // Create new weather entry
router.get('/', checkCache, getWeather);// Get weather data with pagination and filters
router.get('/:id', protect,authorizeManagerOrAdmin,getWeatherById); // Get weather entry by ID
router.put('/:id', protect,authorizeManagerOrAdmin,updateWeather); // Update weather entry by ID
router.delete('/:id', protect,authorizeManagerOrAdmin,deleteWeather); // Delete weather entry by ID

export default router;
