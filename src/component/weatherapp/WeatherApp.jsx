import './WeatherApp.css';
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import { useRef, useState } from 'react';

const WeatherApp = ()=>{
    const cityInput = useRef();
    const [temp, setTemp] = useState(20);
    const [icon, setIcon] = useState(cloud_icon);
    const [city, setCity] = useState("Bengaluru");
    const [humidity, setHumidity] = useState(55);
    const [windSpeed, setWindSpeed] = useState(19);


    const apiKey = "67b938433ab5c46e8f8291f9b2cf4305";
    const search = async ()=>{
        const city = cityInput.current.value;
        
        if(city===""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
        let data = {};

        try{
        let response = await fetch(url);
        data = await response.json();
        if(data.message){
            throw data.message;
        }
        }catch(err){
            alert(err);
            return 0;
        }

        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setHumidity(Math.floor(data.main.humidity));
        setWindSpeed(Math.floor(data.wind.speed));
        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setIcon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setIcon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setIcon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setIcon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setIcon(rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setIcon(rain_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setIcon(snow_icon);
        }
        else{
            setIcon(clear_icon);
        }
        console.log(data);

    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' ref= {cityInput} placeholder='Search' />
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={icon} alt="" />
            </div>
            <div className="weather-temp">{temp}°C</div>
            <div className="weather-location">{city}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{windSpeed} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;