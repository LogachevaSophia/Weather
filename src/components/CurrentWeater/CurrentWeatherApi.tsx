import axios from "../../API/api.tsx"

export default{
    getCurrentWeather () {
        return axios.get("/current.json")
    } , 
    forecast () {
        return axios.get("/forecast.json?days=7")
    }    
}
