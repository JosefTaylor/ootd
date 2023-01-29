// frontend/src/axiosApi.js

import axios from "axios";

export function ToPythonDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

const access_token = "aEjCVqoJ4qbzNIg0nz4Q";
const model = "ootd";
const format = localStorage.getItem("rf.format");
const version = 1;

export const Roboflow = axios.create({
  baseURL: "https://detect.roboflow.com",
  timeout: 50000,
  headers: {},
  withCredentials: true,
});

async function toDataURL(img) {
  return "so sad";
}

export async function getInference(image) {
  const imageText = await toDataURL(image);
  console.log("image:", imageText);
  return axios({
    method: "POST",
    url: "https://detect.roboflow.com/" + model + "/" + version,
    params: {
      api_key: access_token,
    },
    data: imageText,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
    });
}
