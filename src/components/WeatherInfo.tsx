import { Weather } from '../types/WeatherApiResponses'
import { WeatherChart } from './WeatherChart'

//
export const WeatherInfo = ({ weather }: { weather: Weather }) => {
  return (
    <div className="min-h-[500px] grid lg:grid-cols-2 place-items-center gap-x-10 bg-sky-200 px-5 lg:px-10 rounded-b-xl">
      <div className="border border-gray-200 bg-white pb-6 sm:pb-10 px-5 sm:px-10 rounded-xl max-w-[460px] w-full my-10 shadow-lg">
        <div className="flex gap-5 items-center">
          <img
            alt={weather.weather[0].main}
            srcSet={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png 100w, https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png 200w`}
            sizes="(max-width: 768px) 100px,
         150px"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            loading="lazy"
            className="w-[100px] md:w-[150px]"
          />
          <div className="my-5 lg:my-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-sky-900 mb-1 sm:mb-2 break-words">
              {weather.name}, {weather.sys.country}
            </h2>
            <h3 className="text-sky-900 font-semibold text-xl lg:text-2xl">
              {weather.weather[0].main} {Math.round(weather.main.temp)}°C
            </h3>
            <span className="text-sm lg:text-base">
              (feels like {Math.round(weather.main.feels_like)}°C)
            </span>
          </div>
        </div>
        <div className="h-[1px] bg-gray-300 mb-6 lg:mb-10"></div>
        <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5 items-center font-medium lg:text-lg">
          <li>Pressure: {weather.main.pressure}hPa</li>
          <li>Humidity: {weather.main.humidity}%</li>
          <li>Visibility: {weather.visibility / 1000}km</li>
          <li className="flex">
            Wind:
            <svg
              style={{ transform: `rotate(${weather.wind.deg}deg)` }}
              height={18}
              className="self-center ml-2 mr-1 lg:ml-3 lg:mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z" />
            </svg>
            {weather.wind.speed}m/s
          </li>
        </ul>
      </div>
      <WeatherChart weather={weather} />
    </div>
  )
}
