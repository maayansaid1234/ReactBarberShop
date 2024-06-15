import axios from "axios"

axios.defaults.withCredentials=true;

let baseUrl="https://localhost:44308/api/haircut"

export const getAllHaircuts = () => {
    return axios.get(baseUrl+"/GetAllHaircuts"
   
    )
}
