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
  try {
    const response = await API.get("/users/");
    return response.data[0];
  } catch {
    return null;
  }
}

export async function login(username, password) {
  try {
    await API.post("/dj-rest-auth/login/", {
      username: username,
      password: password,
    });
    API.defaults.headers = { "X-CSRFToken": GetCookie("csrftoken") };
    return true;
  } catch {
    console.log("I could not log you in.");
    return false;
  }
}

export async function logout() {
  try {
    await API.post("/dj-rest-auth/logout/");
    console.log("I think we're logged out");
    return true;
  } catch {
    console.log("Could not log out.");
    return false;
  }
}

export async function createWear(garment, date) {
  try {
    await API.post("/garmentwears/", {
      garment: garment.url,
      scan_date: date,
    });
  } catch {
    console.log("Could not create the garment wear");
  }
}

export async function deleteWear(wear) {
  try {
    await API.delete(wear.url);
  } catch {
    console.log("Could not delete the garment.");
  }
}

export async function updateGarment(garmentId, newGarment) {
  try {
    await API.patch("/garments/" + garmentId + "/", { ...newGarment });
  } catch {
    console.log("Could not update the garment.");
  }
}

export async function createGarment(garment) {
  try {
    await API.post("/garments", { ...garment });
  } catch {
    console.log("Could not create the garment.");
  }
}
