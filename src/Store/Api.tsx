
import axios from 'axios';

export default{
    login(data){
        return axios.post("localhost:5000/login", data)
    }
}