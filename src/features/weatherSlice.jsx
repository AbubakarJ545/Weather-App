import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "9145f18606517db6d20b6bb363e39abd";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (cityName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "City not found");
    }
  }
);

const initialState = {
  country: "",
  search: "",
  loading: false,
  temp: null,
  wind: null,
  humidity: null,
  city: "",
  icon: "01d",
  pressure: null,
  visibility: null,
  coord: null,
  weather: null,
  sunrise: null,
  sunset: null,
  dt: null,
  timezone: 0,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        state.temp = data.main.temp;
        state.wind = data.wind.speed;
        state.humidity = data.main.humidity;
        state.city = data.name;
        state.country = data.sys.country;
        state.icon = data.weather[0].icon;
        state.pressure = data.main.pressure;
        state.visibility = data.visibility;
        state.coord = data.coord;
        state.weather = data.weather[0];
        state.sunrise = data.sys.sunrise;
        state.sunset = data.sys.sunset;
        state.dt = data.dt;
        state.timezone = data.timezone;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch weather.";
        state.temp = null;
        state.wind = null;
        state.humidity = null;
        state.city = "";
        state.icon = "01d";
        state.pressure = null;
        state.visibility = null;
        state.coord = null;
        state.weather = null;
        state.sunrise = null;
        state.sunset = null;
        state.dt = null;
        state.timezone = 0;
      });
  },
});

export const { setSearch } = weatherSlice.actions;
export default weatherSlice.reducer;
