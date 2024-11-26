import axios from "axios";
const API_KEY = "445030b0966d482a883230015242411"; // NOTE: The API keys below are intentionally included for demonstration/testing purposes.
// DO NOT use these keys in production. Replace them with secure keys in a .env file or another secure storage method.
const WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json";

export const getWeather = async (city: string) => {
  const response = await axios.get(
    `${WEATHER_API_URL}?key=${API_KEY}&q=${city}`
  );
  return response.data;
};
