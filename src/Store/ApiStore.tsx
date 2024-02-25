
import axios from "../API/api.tsx"

class ApiStrore {
    constructor(){

    }

    getCurrentWeather () {
        const res = axios.get("/current.json")
    }   
}

const apiStore = new ApiStrore()
export default apiStore;