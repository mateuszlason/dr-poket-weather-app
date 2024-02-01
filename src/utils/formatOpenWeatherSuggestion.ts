import { Suggestion } from '../types/WeatherApiResponses'

export const formatOpenWeatherSuggestion = (suggestion: Suggestion): string =>
  `${suggestion.name}, ${suggestion.state ? suggestion.state + ', ' : ''}${
    suggestion.country
  }`
