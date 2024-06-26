import axios from "axios"

axios.defaults.withCredentials=true;

let baseUrl="https://localhost:44308/api/user"
export const login = (data) => {

    return axios.post(baseUrl+"/Login",data
   
    )
}

export const addUser = (data) => {
    return axios.post(baseUrl+"/AddUser",data,
    

    )
}

export const logout = () => {
    
    return fetch(baseUrl + "/Logout", {
        method: "GET",
        credentials: "include" // This is the equivalent of withCredentials: true
    });
   
}

export const getUserFromSession = () => {

   
    return axios.get(baseUrl+"/GetUserFromSession ")
   
   
}