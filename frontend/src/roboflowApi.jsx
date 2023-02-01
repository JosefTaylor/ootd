// frontend/src/axiosApi.js

import axios from "axios";

export function ToPythonDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

const access_token = environment.ROBOFLOW_API_KEY ?? "";
const version = 1;

export async function getInference(encodedImage) {
  return axios({
    method: "POST",
    url: "https://detect.roboflow.com/ootd/" + version,
    params: {
      api_key: access_token,
    },
    data: encodedImage,
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
