import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import apiStore from "../../Store/ApiStore.tsx";
import { currentWeatherStore } from "./CurrentWeatherStore.tsx";
import "./CurrentWeather.css"



const CurrentWeather = observer((props) => {
    useEffect(() => {
        currentWeatherStore.getCurrentWeather()
        currentWeatherStore.getForecastWeather()
    }, [])
    useEffect(() => {
        console.log(currentWeatherStore?.forecast)
        // apiStore.getCurrentWeather()
    }, [currentWeatherStore?.forecast])
    return (
        <div className="form">

            <label>
                Current Weather
            </label>
            <br></br>
            <span className="degree">
                {currentWeatherStore.temp_c}°C
            </span>

            {/* <br></br> */}
            <div className="slider">
                {currentWeatherStore?.forecast?.map((el, ind) => {
                    return (<div className="icons" key={ind}>
                        <span className="text">
                            {el?.text}
                        </span>
                        <img src={`https:${el?.icon}`}></img>
                        <span>
                            {String(el?.date)}
                        </span>
                    </div>)
                })}

              
            </div>
        </div>
    )
})

export default CurrentWeather