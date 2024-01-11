import React, { useState } from 'react'
import "./WeatherCard.css"
import clear_png from "../Assets/clear.png"
import cloud_png from "../Assets/cloud.png"
import drizzle_png from "../Assets/drizzle.png"
import humidity_png from "../Assets/humidity.png"
import rain_png from "../Assets/rain.png"
import search_png from "../Assets/search.png"
import snow_png from "../Assets/snow.png"
import wind_png from "../Assets/wind.png"


const WeatherCard = () => {
   
    let apiKey = "c188893c47c6abbd25dee5e925fc95da"
    let [weatherIcon, setWeatherIcon] = useState("clear_png")

    const search = async() => {
        const element = document.getElementsByClassName("cityInput")

        if(element[0].value === ""){
            return 0
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`

        let response = await fetch(url)

        if(response.status==404){
            document.querySelector(".error").style.display = "block"
            document.querySelector('.weather').style.display= "none"
        }
        else{let data = await response.json()

            let humidity = document.getElementsByClassName("humidity-percent")
            let wind = document.getElementsByClassName("wind-rate")
            let temperature = document.getElementsByClassName("weather-temp")
            let location = document.getElementsByClassName("weather-location")
    
            humidity[0].innerHTML = data.main.humidity+" %";
            wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
            temperature[0].innerHTML = Math.floor(data.main.temp)+"°c";
            location[0].innerHTML = data.name;
    
            if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
                setWeatherIcon(clear_png)
            }
            else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
                setWeatherIcon(cloud_png)
            }
            else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
                setWeatherIcon(drizzle_png)
            }
            else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
                setWeatherIcon(drizzle_png)
            }
            else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
                setWeatherIcon(rain_png)
            }
            else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
                setWeatherIcon(rain_png)
            }
            else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
                setWeatherIcon(snow_png)
            }
            else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
                setWeatherIcon(cloud_icon)
            }
            else{
                setWeatherIcon(clear_png)
            }
            document.querySelector('.weather').style.display= "block"
            document.querySelector(".error").style.display = "none"
        }
    }

  return (
    <div className='container'>
       <div className="top-bar">
       <input type="text" className='cityInput' placeholder='Search' />
       <div className='search-icon' onClick={() => {search()}}>
          <img src={search_png} alt="" />
       </div>
    </div>
    <div className='error'>
        <p>Invalid city name</p>
    </div>
    <div className="weather">
        <div className="weather-img">
            <img className='w-image' src={weatherIcon} alt="" />
        </div>
        <div className="weather-temp">20°c</div>
        <div className="weather-location">New York</div>
      <div className='data-container'>
        <div className="element">
            <img src={humidity_png} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">70%</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={wind_png} alt="" className="icon" />
            <div className="data">
                <div className="wind-rate">18 km/h</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard