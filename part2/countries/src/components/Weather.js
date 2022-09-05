import axios from "axios";
import { useEffect, useState } from "react";


const Weather = ({country}) => {
    const [weather, setWeather] = useState([]);
    const api_key = process.env.REACT_APP_MY_API_KEY;
    const capital = country.capital;
    console.log(capital)
    const api_call = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`

    useEffect(() => {
      axios.get(api_call).then(response => {setWeather(response.data)})
  }, [api_call])

  try{
    return(
        <div>
            <h2>Weather in {country.name.common}</h2>
            <p>Temperature: {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].main}></img>
            <p>Wind {weather.wind.speed}m/s</p>
        </div>
    )}catch{
      return("PERROR!")
    }


}

export default Weather;