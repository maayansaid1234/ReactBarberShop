import axios from "axios"

axios.defaults.withCredentials=true;

let baseUrl="https://localhost:44308/api/appointment"

export const addAppointment = (data) => {
    return axios.post(baseUrl+"/AddAppointment",data)
}
export const updateAppointment = (id,data) => {
    return axios.put(baseUrl+"/UpdateAppointment/"+id,data)
}
export const getAppointments = () => {
    return axios.get(baseUrl+"/GetAllAppointments" )
}
export const deleteAppointment = (id) => {
    return axios.delete(baseUrl+"/DeleteAppointment/"+id)
}