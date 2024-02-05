import { Dispatch, useState } from 'react'
import { Suggestion, Weather } from '../types/WeatherApiResponses'
import { useQueryClient } from '@tanstack/react-query'
import { formatOpenWeatherSuggestion } from '../utils/formatOpenWeatherSuggestion'
import { fetchWeather } from '../api/fetchWeather'
import { SearchBox } from './SearchBox'
import { RecentSearches } from './RecentSearches'
import { WeatherInfo } from './WeatherInfo'
import { getFetchErrorMessage } from '../utils/getFetchErrorMessage'
import { toast } from 'react-toastify'

export type GetWeather = (suggestion: Suggestion) => Promise<void>
type WeatherState = Weather | null
export type SetWeather = Dispatch<React.SetStateAction<WeatherState>>

export const WeatherDashboard = () => {
  const queryClient = useQueryClient()
  const [weather, setWeather] = useState<WeatherState>(null)
  const getWeather: GetWeather = async (place) => {
    const openMapQuery = formatOpenWeatherSuggestion(place)
    try {
      const weatherData = await queryClient.fetchQuery({
        queryKey: ['weather', openMapQuery],
        queryFn: () => fetchWeather(place),
      })
      setWeather(weatherData)
    } catch (error) {
      toast.error(getFetchErrorMessage(error))
    }
  }
  return (
    <div className="bg-white rounded-xl shadow-inner">
      <h1 className="px-5 text-sky-900 font-semibold text-3xl lg:text-5xl text-center pt-5 lg:pt-10">
        Dr Poket Weather App
      </h1>
      <div className="gap-5 py-10 max-w-[460px] mx-auto grid items-stretch  px-5 lg:px-10">
        <SearchBox getWeather={getWeather} />
        <RecentSearches setWeather={setWeather} />
      </div>
      {weather && <WeatherInfo weather={weather} />}
    </div>
  )
}
