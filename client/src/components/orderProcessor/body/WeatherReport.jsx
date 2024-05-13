import React from 'react'
import WeatherChart from './WeatherChart';

const WeatherReport = () => {

  return (
    <div className='card'>
      <div className="card-body pb-0">
        <h5 className="card-title">
          Weather Forecast
        </h5>
        <div className='text-center'>
        <WeatherChart />
        </div>
      </div>
    </div>
  )
}

export default WeatherReport
