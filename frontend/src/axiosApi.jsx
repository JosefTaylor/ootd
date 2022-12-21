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
    return cookieValue;
}

const API = axios.create({
    baseURL:
        environment.RENDER
            ? environment.RENDER_EXTERNAL_URL + '/api/'
            : 'http://localhost:8000/api/',
    timeout: 50000,
    headers: { "X-CSRFToken": GetCookie('csrftoken') },
    withCredentials: true,
});


export { API, GetCookie };
