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
        // console.log(currentWeatherStore?.forecast)
        // apiStore.getCurrentWeather()
    }, [currentWeatherStore?.forecast])
    return (
        <div className="form">

            {/* <label>
                Current Weather
            </label> */}
            <br></br>
            <div >
                <span className="degree alignleft">{currentWeatherStore.temp_c}°C</span>
               
                <span className="opacityWhite  width alignleft">feels like {currentWeatherStore.feelslike_c}</span>
                
            </div>
            <div className="location opacityWhite">
                
                <span>
                    Saint-Peterburg
                </span>

                <span className="material-symbols-outlined">
                    near_me
                </span>
            </div>
            <div className="now opacityWhite alignleft">
                <span>Now</span>

            </div>


            {/* <br></br> */}
            <div className="slider">
                {currentWeatherStore?.forecast?.map((el, ind) => {
                    return (<div className="icons" key={ind}>
                        <span className="text">
                            {el?.text}
                        </span>
                        <img src={`https:${el?.icon}`}></img>
                        <span className="date">
                            {String(el?.date)}
                        </span>
                    </div>)
                })}


            </div>
        </div>
    )
})

export default CurrentWeather