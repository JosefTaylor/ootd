// frontend/src/axiosApi.js

import axios from "axios";

export function GetCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = cookie.substring(name.length + 1);
        // cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const API = axios.create({
  baseURL: environment.RENDER_EXTERNAL_URL
    ? environment.RENDER_EXTERNAL_URL + "/api/"
    : "http://localhost:8000/api/",
  timeout: 50000,
  headers: { "X-CSRFToken": GetCookie("csrftoken") },
  withCredentials: true,
});

export async function getDashboardData() {
  return API.get("/dashboard/")
    .then((response) => {
      const dashData = response.data[0];
      return dashData;
    })
    .catch((error) => {
      if (error.response.status === 403) {
        console.log("not logged in we're in a catch block");
        return null;
      } else {
        console.log("Error: ", JSON.stringify(error, null, 4));
        throw error;
      }
    });
}

export async function getUser() {
  return API.get("/users/")
    .then((response) => {
      return response.data[0];
    })
    .catch((error) => {
      if (error.response.status === 403) {
        return null;
      } else {
        console.log("Error: ", JSON.stringify(error, null, 4));
        throw error;
      }
    });
}

export async function login(username, password) {
  return API.post("/dj-rest-auth/login/", {
    username: username,
    password: password,
  })
    .then((response) => {
      API.defaults.headers = { "X-CSRFToken": GetCookie("csrftoken") };
      const user = response.data[0];
      console.dir(response.data[0]);
      console.log("I think we're logged in!");
      return user;
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
}

export async function logout() {
  return API.post("/dj-rest-auth/logout/")
    .then((response) => {
      console.log("I think we're logged out");
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function createWear(garment, date) {
  return API.post("/garmentwears/", {
    //Axios to send and receive HTTP requests
    garment: garment,
    scan_date: date,
  }).catch((err) => console.log(err));
}

export async function deleteWear(wear) {
  return API.delete(wear.url).catch((err) => console.log(err));
}

export async function updateGarment(garmentId, newGarment) {
  return API.patch("/garments/" + garmentId + "/", { ...newGarment }).catch(
    (err) => console.log(err)
  );
}

export async function createGarment(garment) {
  return API.post("/garments", { ...garment }).catch((err) => console.log(err));
}
