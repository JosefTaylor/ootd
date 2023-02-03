/* eslint-disable no-undef */
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

export function ToPythonDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

export const OOTD = axios.create({
  baseURL: environment.RENDER_EXTERNAL_URL
    ? environment.RENDER_EXTERNAL_URL + "/api/"
    : "http://localhost:8000/api/",
  timeout: 50000,
  headers: { "X-CSRFToken": GetCookie("csrftoken") },
  withCredentials: true,
});

export async function getDashboardData() {
  return OOTD.get("/dashboard/")
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
    const response = await OOTD.get("/fashionistas/");
    return response.data[0];
  } catch {
    return null;
  }
}

export async function login(username, password) {
  try {
    await OOTD.post("/dj-rest-auth/login/", {
      username: username,
      password: password,
    });
    OOTD.defaults.headers = { "X-CSRFToken": GetCookie("csrftoken") };
    return null;
  } catch (error) {
    console.log("I could not log you in.");
    return error.response.data;
  }
}

export async function logout() {
  try {
    await OOTD.post("/dj-rest-auth/logout/");
    console.log("I think we're logged out");
    return null;
  } catch (error) {
    console.log("Could not log out.");
    return error.response.data;
  }
}

export async function register(username, password, email) {
  try {
    await OOTD.post("/dj-rest-auth/registration/", {
      username: username,
      password: password,
      email: email,
    });
    OOTD.defaults.headers = { "X-CSRFToken": GetCookie("csrftoken") };
    return null;
  } catch (error) {
    console.log("Could not register!");
    return error.response.data;
  }
}

export async function createWear(garment, date) {
  try {
    await OOTD.post("/garmentwears/", {
      garment: garment.url,
      date: date,
    });
  } catch {
    console.log("Could not create the garment wear");
  }
}

export async function deleteWear(wear) {
  try {
    await OOTD.delete(wear.url);
  } catch {
    console.log("Could not delete the garment.");
  }
}

export async function updateGarment(garmentId, newGarment) {
  try {
    await OOTD.patch("/garments/" + garmentId + "/", { ...newGarment });
  } catch {
    console.log("Could not update the garment.");
  }
}

export async function createGarment(garment) {
  try {
    const response = await OOTD.post("/garments/", { ...garment });
    return response.data;
  } catch {
    console.log("Could not create the garment.");
  }
}
