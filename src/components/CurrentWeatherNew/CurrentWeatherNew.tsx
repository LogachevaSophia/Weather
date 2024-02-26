import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import apiStore from "../../Store/ApiStore.tsx";
import "./CurrentWeather.css"
import { currentWeatherStore } from "../CurrentWeater/CurrentWeatherStore.tsx";
import moment from "moment";



const CurrentWeatherNew = observer((props) => {
    useEffect(() => {
        currentWeatherStore.getCurrentWeather()
        currentWeatherStore.getForecastWeather()
    }, [])
    useEffect(() => {
        console.log(currentWeatherStore?.forecast)
        // apiStore.getCurrentWeather()
    }, [currentWeatherStore?.forecast])
    return (

        <div className="container">
            <div className="header">
                <div className="degree textAlignLeft">
                    <span className="bigfont">{currentWeatherStore.temp_c}°C</span>
                    <br></br>
                    <span className="opacitycolor">{currentWeatherStore.condition?.text}</span>
                </div>
                <img src={"https://" + currentWeatherStore.condition?.icon}></img>
                <div className="location textAlignLeft">
                    <div>
                        <span>
                            Saint-Peterburg
                        </span>

                        <span className="material-symbols-outlined">
                            near_me
                        </span>
                    </div>


                    <span className="textAlignLeft opacitycolor">Feels like{currentWeatherStore.feelslike_c}</span>
                </div>



            </div>
            <div className="body">
                <div className="hours">
                    {currentWeatherStore.forecast[0]?.hour?.map((el) => {
                        return (
                            <div key={el?.time}>
                                {moment(el?.time).format("HH:MM")}
                                <img src={"https://" + el?.condition?.icon} alt="" />
                                <span>
                                    {el?.temp_c}°
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div className="forecast">
                    {currentWeatherStore.forecast?.map((el, ind) => {
                        console.log(el)
                        return (
                            <div className="row" key={ind}>
                                <span>{el?.date}</span>
                                <span className="material-symbols-outlined">
                                    water_drop
                                </span>
                                <span>{el?.daily_chance_of_rain}%</span>
                                <img src={"https://" + el?.icon}></img>
                                <span>
                                    {el?.maxtemp_c}°
                                </span>
                                <span>
                                    {el?.mintemp_c}°
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>




            {/* <div>
                <span className="bigfont">{currentWeatherStore.temp_c}°C</span>
                <span className="">{currentWeatherStore.feelslike_c}</span>
            </div> */}
        </div>
    )
})

export default CurrentWeatherNew