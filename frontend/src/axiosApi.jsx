// frontend/src/axiosApi.js

import axios from "axios";

// const cookie = document.cookie
//     .split(";")
//     .find((row) => row.startsWith("csrftoken"))
//     ?.split("=")[1];

const API = axios.create({
    baseURL: "http://localhost:8000/api/",
    timeout: 50000,
    headers: {
        'Authorization': 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json',
    }
    //withCredentials: true,
    //headers: { "X-CSRFToken": cookie },
    //headers: {"X-CSRFToken": document.cookie.csrftoken.value}
});

// API.interceptors.response.use(
//     response => response, 
//     error => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
//             const refresh_token = localStorage.getItem('refresh_token');

//             return API
//                 .post('/token/refresh/', {refresh: refresh_token})
//                 .then((response) => {

//                     localStorage.setItem('access_token', response.data.access);
//                     localStorage.setItem('refresh_token', response.data.refresh);

//                     // axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
//                     // originalRequest.headers['Authorization'] = "JWT " + response.data.access;

//                     return API(originalRequest);
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 });
//         }
//         // specific error handling done elsewhere
//         return Promise.reject({...error});
//     }
// );

export default API;
