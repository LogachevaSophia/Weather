import { makeAutoObservable,runInAction } from "mobx"
import API from "./CurrentWeatherApi.tsx"


interface CurrentData {
    name: string;
    age: number;
    city: string;
  }
export class CurrentWeatherStore {

    temp_c = null;
    temp_f = null;

    constructor() {
        makeAutoObservable(this);
    }

    getCurrentWeather = async () => {
        try {
            const response = await API.getCurrentWeather()
            runInAction(()=>{
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


}

export const currentWeatherStore = new CurrentWeatherStore();