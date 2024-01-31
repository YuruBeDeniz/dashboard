import "./index.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { convertKelvinToCelcius } from "../../utilities/tempConverter.js";
import { formatSunrise, formatSunset } from "../../utilities/formatSunriseSunset";


export default function BerlinWeatherCard() {
  const [berlinWeatherInfo, setBerlinWeatherInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getBerlinWeather = () => {
      axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?id=2950159&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => {
        setBerlinWeatherInfo(response.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }; 

  useEffect(() => {
    getBerlinWeather()
  }, []);
  
  
 
  const iconCode = berlinWeatherInfo?.list?.[0]?.weather?.[0]?.icon;
  const description = berlinWeatherInfo?.list?.[0]?.weather?.[0]?.description;
  const city =  berlinWeatherInfo?.city?.name;
  const temp = berlinWeatherInfo?.list?.[0]?.main?.temp;
  const minTemp = berlinWeatherInfo?.list?.[0]?.main?.temp_min;
  const maxTemp = berlinWeatherInfo?.list?.[0]?.main?.temp_max;
  const sunrise = berlinWeatherInfo?.city?.sunrise;
  const sunset = berlinWeatherInfo?.city?.sunset;
  const timezone = berlinWeatherInfo?.city?.timezone;
  
  return (
    <>
    <h1 className="weather-card-title">Today's Weather</h1>
    {isLoading 
      ? <p>Loading...</p>
      : <div className="weather-card">
          <div className="city-weather-wrapper">
            <div className="city-min-max-group">
              <h1>{city}</h1>
              <p>Min {convertKelvinToCelcius(minTemp)} &deg;C</p>
              <p>Max {convertKelvinToCelcius(maxTemp)} &deg;C</p>
            </div>
            <div className="weather-description">
              <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt={city}/>
              <p>{description}</p>
              <span>{convertKelvinToCelcius(temp)} &deg;C</span>
            </div>
          </div>
          <div className="sunrise-sunset-group">
          <p style={{color: "gold"}}>Sunrise: <span>{formatSunrise(sunrise, timezone)}</span></p>
          <p style={{color: "darkorange"}}>Sunset: <span>{formatSunset(sunset, timezone)}</span></p>
          </div>
        </div>}
      </>

  )
}
