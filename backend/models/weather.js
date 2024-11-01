import mongoose from "mongoose";

const weatherSchema = mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    windSpeed: {
      type: Number,
    },
    precipitation: {
      type: Number,
    },
    pressure: {
      type: Number,
    },
    location: {
      type: String,
      required: true,
      unique: true, // Ensure location is unique
    },
  },
  {
    timestamps: true,
  }
);

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
