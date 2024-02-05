import { useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { useCallback, useMemo, useState, ChangeEvent } from 'react'
import type { Suggestion } from '../types/WeatherApiResponses'
import { formatOpenWeatherSuggestion } from '../utils/formatOpenWeatherSuggestion'
import { fetchPlaceSuggestions } from '../api/fetchSuggestions'
import { GetWeather } from './WeatherDashboard'
import { getFetchErrorMessage } from '../utils/getFetchErrorMessage'
import { toast } from 'react-toastify'

export const SearchBox = ({ getWeather }: { getWeather: GetWeather }) => {
  const queryClient = useQueryClient()
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null)
  const [query, setQuery] = useState('')
  const [isFetchingSuggestions, setIsFetchingSuggestions] =
    useState<boolean>(false)

  const getSuggestions = useCallback(
    async (passedQuery: string) => {
      try {
        const suggestionsData = await queryClient.fetchQuery({
          queryFn: () => fetchPlaceSuggestions(passedQuery),
          queryKey: ['suggestions', passedQuery],
          staleTime: Infinity,
        })
        setIsFetchingSuggestions(false)
        setSuggestions(suggestionsData)
      } catch (error) {
        toast.error(getFetchErrorMessage(error))
        setIsFetchingSuggestions(false)
      }
    },
    [queryClient]
  )

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 600),
    [getSuggestions]
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setQuery(newQuery)
    if (newQuery.length > 3) {
      if (!isFetchingSuggestions) setIsFetchingSuggestions(true)
      getSuggestionsDebounce(newQuery)
    }
    if (!newQuery.length) setSuggestions(null)
  }

  const handlePlaceSelection = (place: Suggestion) => {
    const openMapQuery = formatOpenWeatherSuggestion(place)
    setQuery(openMapQuery)
    setSuggestions(null)
    getWeather(place)
  }

  // this can be extracted
  const Suggestions = () => {
    const className =
      '-z-10 text-gray-900 border-b border-x border-gray-300 bg-gray-50 focus:border-gray-500 absolute w-full top-[calc(100%-6px)] text-sm rounded-b-md pt-3 pb-2'
    if (isFetchingSuggestions)
      return <p className={`${className} px-10`}>Loading...</p>

    if (Array.isArray(suggestions)) {
      if (suggestions.length > 0) {
        return (
          <div className={className}>
            {suggestions.map((suggestion, idx) => (
              <p
                key={idx}
                className={`py-1 px-10 hover:bg-sky-100 cursor-pointer`}
                onClick={() => handlePlaceSelection(suggestion)}
              >
                {formatOpenWeatherSuggestion(suggestion)}
              </p>
            ))}
          </div>
        )
      }
      return <p className={`${className} px-10`}>No results.</p>
    }
  }
  return (
    <div>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative z-0">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={handleInputChange}
          value={query}
          type="search"
          id="search"
          className="transition rounded-md block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50  focus:border-gray-500"
          placeholder="Search city"
          onBlur={() =>
            Array.isArray(suggestions) &&
            !suggestions.length &&
            setSuggestions(null)
          }
        />
        <Suggestions />
      </div>
    </div>
  )
}
