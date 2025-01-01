// Imports
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessToken, getRefreshToken, getUser } from "../hooks/userActions";



// Base url
const BASE_URL = process.env.REACT_APP_API_URL;



// Axios Service
const axiosService = axios.create({
    baseURL:BASE_URL,
    headers: {
        "Content-Type":"application/json",
    },
});



// Request interceptor
axiosService.interceptors.request.use(async(config) => {    
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
})



// Resolve the request and return a resolved or rejected promise
axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err),
);



// Function that contains the refresh auth logic. It will be called whenever 
// the failed request return a 401 error
const refreshAuthLogic = async(failedRequest) => {
    return axios
        .post("/auth/refresh/", {refresh:getRefreshToken()}, {
            baseURL:BASE_URL,
            headers: {
                Authorization: `Bearer ${getRefreshToken()}`
            },
        })
        .then((resp) => {
            const {access} = resp.data;
            failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
            localStorage.setItem("auth", JSON.stringify({access, refresh:getRefreshToken(), user:getUser()}))
        })
        .catch((e) => {
            localStorage.removeItem("auth");
        });
};



// initializing the authentication interceptor and creating a custom fetcher
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);



// Exports
export function fetcher(url) {
    return axiosService
        .get(url)
        .then((res) => res.data)
}



export default axiosService;



