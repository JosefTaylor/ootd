// frontend/src/axiosApi.js

import axios from "axios";

// const cookie = document.cookie
//     .split(";")
//     .find((row) => row.startsWith("csrftoken"))
//     ?.split("=")[1];

const API = axios.create({
    baseURL:
        environment.API_ROOT != ""
            ? environment.API_ROOT
            : 'http://localhost:8000/',
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

API.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        if (error.response.status === 401
            && error.response.statusText === "Unauthorized"
            && error.response.data.code === "token_not_valid") {
            const refresh_token = localStorage.getItem('refresh_token');
            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now() / 1000);
                if (tokenParts.exp > now) {

                    return API
                        .post('/token/refresh/', { refresh: refresh_token })
                        .then((response) => {

                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);

                            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                            originalRequest.headers['Authorization'] = "JWT " + response.data.access;

                            return API(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now);
                }
            } else {
                console.log("no refresh token");
            }
        }
        // error not 401
        return Promise.reject({ ...error });
    }
);

export default API;
