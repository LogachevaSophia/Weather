import { makeAutoObservable, runInAction } from "mobx"
import API from "../API/CurrentWeatherApi.tsx"
import moment from"moment";


interface Day {
    date: Date,
    avgtemp_c: number,
    maxtemp_c: number,
    mintemp_c: number,
    icon: string,
    text: string,
    hour: [],
    daily_chance_of_rain: number
}



export class CurrentWeatherStore {
    temp_c: number | null = null

    temp_f: number | null = null
    forecast: Day[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getCurrentWeather = async () => {
        try {
            const response = await API.getCurrentWeather()
            runInAction(() => {
                Object.keys(response?.data?.current).forEach((key) => {
                    // if (this.hasOwnProperty(key)) {
                    this[key] = response?.data?.current[key];
                    // }
                });
                // this.temp_c = response?.data?.current?.temp_c
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    getForecastWeather = async () => {
        try {
            const response = await API.forecast()
            runInAction(() => {
                this.forecast = []
                for (let i in response?.data?.forecast?.forecastday) {
                    let day:Day = response?.data?.forecast?.forecastday[i]
                    this.forecast.push(
                        {
                            date: moment(day?.date).format("DD"),
                            avgtemp_c: day?.day?.avgtemp_c,
                            icon: day?.day?.condition?.icon,
                            text: day?.day?.condition?.text,
                            maxtemp_c: day?.day?.maxtemp_c,
                            mintemp_c:day?.day?.mintemp_c,
                            hour: day?.hour,
                            daily_chance_of_rain: day?.day?.daily_chance_of_rain

                        })
                    

                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }


}

export const currentWeatherStore = new CurrentWeatherStore();