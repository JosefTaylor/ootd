// frontend/src/axiosApi.js

import axios from "axios";

const cookie = document.cookie
    .split(";")
    .find((row) => row.startsWith("csrftoken"))
    ?.split("=")[1];

const API = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: { "X-CSRFToken": cookie },
    //headers: {"X-CSRFToken": document.cookie.csrftoken.value}
});

export default API;
