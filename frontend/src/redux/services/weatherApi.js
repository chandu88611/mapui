import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery"; // Custom base query setup for Axios

export const WEATHER_API = "weatherApi";

export const weatherApi = createApi({
  reducerPath: WEATHER_API,
  baseQuery: apiBaseQuery,
  tagTypes: ["Weather"],
  endpoints: (builder) => ({
    // Fetch weather data with pagination and filters
    fetchWeatherData: builder.query({
      query: ({ page = 1, limit = 10, location = "", date = "" } = {}) => ({
        url: "weather",
        method: "GET",
        params: {
          page,
          limit,
          location,
          date,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Weather", id: _id })),
              { type: "Weather", id: "LIST" },
            ]
          : [{ type: "Weather", id: "LIST" }],
    }),

    // Fetch single weather entry by ID
    fetchWeatherById: builder.query({
      query: (id) => ({
        url: `weather/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Weather", id }],
    }),

    // Import weather data from CSV (admin action)
    importWeatherData: builder.mutation({
      query: (formData) => ({
        url: "weather/import-csv",
        method: "POST",
        body:formData
      }),
      invalidatesTags: [{ type: "Weather", id: "LIST" }],
    }),

    // Create new weather entry
    createWeather: builder.mutation({
      query: (weatherData) => ({
        url: "weather",
        method: "POST",
        body: weatherData,
      }),
      invalidatesTags: [{ type: "Weather", id: "LIST" }],
    }),

    // Update weather entry by ID
    updateWeather: builder.mutation({
      query: ({ id, ...weatherData }) => ({
        url: `weather/${id}`,
        method: "PUT",
        body: weatherData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Weather", id }],
    }),

    // Delete weather entry by ID
    deleteWeather: builder.mutation({
      query: (id) => ({
        url: `weather/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Weather", id }],
    }),
  }),
});

export const {
  useFetchWeatherDataQuery,
  useFetchWeatherByIdQuery,
  useImportWeatherDataMutation,
  useCreateWeatherMutation,
  useUpdateWeatherMutation,
  useDeleteWeatherMutation,
} = weatherApi;
