import { Suggestion, Weather } from '../types/WeatherApiResponses'
import { handleOpenWeatherApiError } from '../utils/handleOpenWeatherApiError'

export const fetchWeather = (place: Suggestion): Promise<Weather> => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${
      place.lon
    }&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`
  ).then(async (res) => {
    await handleOpenWeatherApiError(res)
    return await res.json()
  })
}
