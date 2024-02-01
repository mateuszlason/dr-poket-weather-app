import { useQueryClient } from '@tanstack/react-query'
import { SetWeather } from './WeatherDashboard'
import { Weather } from '../types/WeatherApiResponses'
import { takeRight } from 'lodash'
export const RecentSearches = ({ setWeather }: { setWeather: SetWeather }) => {
  const queryClient = useQueryClient()
  const recentWeatherData = takeRight(
    queryClient
      .getQueriesData<Weather>({
        queryKey: ['weather'],
      })
      .filter((item) => item[1]),
    4
  ).reverse()
  if (!recentWeatherData.length) return null
  return (
    <div className="grid items-center">
      <h3 className="text-lg font-medium mb-1">Recent Searches:</h3>
      <ul className="flex flex-wrap gap-1.5">
        {recentWeatherData.map((weatherItem, idx) => (
          <li
            onClick={() => setWeather(weatherItem[1]!)}
            className="grid place-items-center text-center cursor-pointer px-2.5 py-1.5 rounded text-white font-semibold bg-sky-600"
            key={`recent-weather-${idx}`}
          >
            {weatherItem[1]!.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
