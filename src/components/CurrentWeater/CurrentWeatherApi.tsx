import axios from "../../API/api.tsx"

export default{
    getCurrentWeather () {
        return axios.get("/current.json")
    }   
}
