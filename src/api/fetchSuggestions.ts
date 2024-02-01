import { Suggestion } from '../types/WeatherApiResponses'
import { formatOpenWeatherSuggestion } from '../utils/formatOpenWeatherSuggestion'

export const fetchPlaceSuggestions = async (
  query: string
): Promise<Suggestion[] | []> => {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
      import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
    }`
  ).then(async (res) => {
    const response: Suggestion[] | [] = await res.json()
    if (!response.length) {
      return []
    }
    const uniqueCombinations = new Set<string>()
    return response.filter((value) => {
      const combinationKey = formatOpenWeatherSuggestion(value)
      if (!uniqueCombinations.has(combinationKey)) {
        uniqueCombinations.add(combinationKey)
        return true
      }
      // If it's already in the Set, exclude it from the result
      return false
    })
  })
}
