import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import apiStore from "../../Store/ApiStore.tsx";
import { currentWeatherStore } from "./CurrentWeatherStore.tsx";
import "./CurrentWeather.css"

const CurrentWeather = observer((props) => {
    useEffect(() => {
        currentWeatherStore.getCurrentWeather()

    }, [])
    useEffect(() => {
        currentWeatherStore.getCurrentWeather()
        console.log(currentWeatherStore?.condition)
        // apiStore.getCurrentWeather()
    }, [currentWeatherStore?.condition])
    return (
        <div className="form">

            <label>
                Current Weather
            </label>
            <br></br>
            <span className="degree">
                {currentWeatherStore.temp_c}°C
            </span>

            <br></br>
            <div className="icons">
                <span>
                    {currentWeatherStore?.condition?.text}
                </span>
                <img src={`https:${currentWeatherStore?.condition?.icon}`}></img>
            </div>
        </div>
    )
})

export default CurrentWeather