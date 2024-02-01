import { Weather } from '../types/WeatherApiResponses'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ChartOptions,
} from 'chart.js'

import { Radar } from 'react-chartjs-2'
import { normalizeData } from '../utils/normalizeData'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

export const WeatherChart = ({ weather }: { weather: Weather }) => {
  const data = {
    labels: ['Temperature', 'Humidity', 'Wind Speed'],
    datasets: [
      {
        // normalizing to 0-10 values
        data: [
          normalizeData(weather.main.temp, -10, 40, 0, 10),
          // humidity value spans from 0 to 100
          weather.main.humidity / 10,
          // visibility is provided in meters up to 10000m
          // dividing by 1000 makes the number fit the desired threshold
          normalizeData(weather.wind.speed, 0, 40, 0, 10),
        ],
        backgroundColor: 'rgba(0, 100, 255, 0.3)',
        borderColor: 'rgba(0, 100, 255, 0.4)',
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions = {
    scales: {
      r: {
        backgroundColor: 'white',
        suggestedMin: 0,
        suggestedMax: 10,
        grid: {
          color: [
            'rgba(200,200,200,0.7)',
            'rgba(150,150,150,0.4)',
            'rgba(50,50,50,0.3)',
            'rgba(154, 200, 235, 0.5)',
            'rgba(100,50,50,0.15)',
            'rgba(150,200,150,0.2)',
            'rgba(150,200,150,0.3)',
            'rgba(255,100,100,0.2)',
            'rgba(255,100,100,0.1)',
            'rgba(250, 150, 90, 0.1)',
            'rgba(250, 150, 90, 0.15)',
          ],
          lineWidth: 10,
        },
        ticks: {
          display: false,
        },
      },
    },
  }
  return (
    <Radar
      // Would need to troubleshoot chart.js typings
      // @ts-expect-error: Unreachable code error
      options={options}
      className="max-h-[480px] max-w-[480px]"
      data={data}
    ></Radar>
  )
}
