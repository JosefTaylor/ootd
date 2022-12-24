// frontend/src/axiosApi.js

import axios from "axios";

export function GetCookie(name) {
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

export const API = axios.create({
    baseURL:
        environment.RENDER_EXTERNAL_URL
            ? environment.RENDER_EXTERNAL_URL + '/api/'
            : 'http://localhost:8000/api/',
    timeout: 50000,
    headers: { "X-CSRFToken": GetCookie('csrftoken') },
    withCredentials: true,
});

export async function getDashboardData() {
    let dashData = {}
    await API.get("/dashboard/")
        .then((response) => {
            dashData = response.data[0]
        })
        .catch((error) => {
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        });
    return dashData;
}

export async function getUser() {
    let user = {}
    await API.get("/users/")
        .then((response) => {
            user = response.data[0]
        })
        .catch((error) => {
            if (error.response.status === 403) {
                this.setState({ page: "login" }) // we're not logged in, go to login screen.
            }
            else {
                console.log("Error: ", JSON.stringify(error, null, 4));
                throw error;
            }
        });
    return user;
}

export function logout() {
    API.post("/dj-rest-auth/logout/")
        .then((response) => {
            console.log("I think we're logged out")
        })
        .catch((error) => {
            console.log(error);
        })
}

export function createWear(garment, date) {
    API.post("/garmentwears/", {
        //Axios to send and receive HTTP requests
        garment: garment,
        scan_date: date,
    })
        .catch((err) => console.log(err));
}

export function deleteWear(wear) {
    
    API.delete(wear.url)
        .catch((err) => console.log(err));
}

export function updateGarment(garmentId, newGarment) {

    API.patch("/garments/" + garmentId + "/", {...newGarment})
        .catch((err) => console.log(err));
}

export function createGarment(garment) {

    API.post("/garments", {...garment})
        .catch((err) => console.log(err));
}