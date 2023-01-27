// frontend/src/axiosApi.js

import axios from "axios";

export function ToPythonDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

export const Roboflow = axios.create({
  baseURL: "",
  timeout: 50000,
  headers: {},
  withCredentials: true,
});

export async function getInference() {
  try {
    const response = await Roboflow.get("");
    return response.data[0];
  } catch {
    return null;
  }
}
