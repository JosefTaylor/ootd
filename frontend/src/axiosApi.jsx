// frontend/src/axiosApi.js

import axios from "axios";

function GetCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = cookie.substring(name.length + 1);
                // cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log("I just grabbed the cookie. it's: " + cookieValue);
    return cookieValue;
}

const API = axios.create({
    baseURL:
        environment.API_ROOT != ""
            ? environment.API_ROOT
            : 'http://localhost:8000/',
    timeout: 50000,
    headers: {"X-CSRFToken": GetCookie('csrftoken')},
    withCredentials: true,
});


export { API, GetCookie };
